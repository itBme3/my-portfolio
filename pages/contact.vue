<template>
  <div class="about page narrowest">
    <PageTitle class="text-center">
      Get in Touch:
    </PageTitle>
    <div class="form-wrap w-full px-12 pt-12 pb-10 rounded-md border border-gray-600 mt-12">
      <div 
        v-if="['sending','sent', 'error'].includes(formState)"
        class="text-center flex flex-col items-center">
        <h4 v-if="formState === 'error'" class="text-red-500">Whoops, there was an issue sending...</h4>
        <h2 v-else-if="formState === 'sent'"><span class="text-2xl">Sent 🙌</span><br><br>...talk soon!</h2>
        <template v-else-if="formState === 'sending'">
          <h2 class="mx-auto mb-4" >Sending...</h2>
          <Loading class="mx-auto !my-8 block" />
        </template>
        <button 
          class="bg-gray-800 hover:bg-gray-700 mt-6"
          @click="resetForm">reset</button>
      </div>
      <form
        v-else
        class="w-full"
        @submit="e => {
        e.preventDefault();
        submitForm()
        }">
        <div class="w-full form-field flex flex-col">
          <label for="senderName">Name:</label>
          <input 
            id="senderName" 
            v-model="formData.name" 
            type="text"  required />
        </div>
        <div class="w-full form-field flex flex-col">
          <label for="senderEmail">Email:</label>
          <input 
            id="senderEmail" 
            v-model="formData.email" 
            type="email" required />
        </div>
        <div class="w-full form-field flex flex-col">
          <label for="senderMessage">Message:</label>
          <textarea 
            id="senderMessage" 
            v-model="formData.message" 
            required></textarea>
        </div>
        <button class="bg-green-500 text-green-900 hover:bg-green-400" type="submit">send</button>
      </form>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  export default Vue.extend({
    data: () => ({
      formState: 'ready',
      formData: {
        name: '',
        email: '',
        message: ''
      }
    }),
    methods: {
      resetForm() {
        this.formData = {
          name: '',
          email: '',
          message: ''
        }
        this.formState = 'ready'
      },
      submitForm() {
        this.formState = 'sending'
        console.log(this.formData)
        this.$axios.$post('/api/contact', this.formData)
          .then(res => {
            console.log({ res })
            if(res.errors) {
              this.formState = 'error'
              console.error(res.errors)
            } else {
              this.formState = 'sent'
            }
          }).catch(err => {
            console.error(err.message);
            this.formState = 'error'
          });
      }
    }
  })
</script>

<style lang="scss">
.form-field {
  @apply mb-10;
  input, textarea {
    transition: all .1s ease;
    @apply p-0 -mt-1 #{!important};
    &:focus-visible {
      @apply p-2 mt-0 #{!important};
    }
  }
}
</style>