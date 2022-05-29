<template>
  <div class="about page narrowest">
    <PageTitle class="text-center">
      Get in Touch:
    </PageTitle>

    <div 
      v-if="['sending','sent', 'error'].includes(formState)"
      class="text-center flex flex-col items-center">
      <h2 v-if="formState === 'error'">Whoops, there was an issue sending...</h2>
      <h2 v-if="formState === 'sent'">🙌<br>Sent! ... I'll get right back to you.</h2>
      <template v-else>
        <h2 class="mx-auto" >Sending...</h2>
        <Loading class="mx-auto" />
      </template>
      <button 
        class="bg-gray-800 hover:bg-gray-700"
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
          type="text"  required/>
      </div>
      <div class="w-full flex flex-col">
        <label for="senderEmail">Email:</label>
        <input 
          id="senderEmail" 
          v-model="formData.email" 
          type="email" required/>
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
      }
    }
  })
</script>

<style lang="scss">
.form-field {
  @apply pb-4;
  input, textarea {
    transition: all .1s ease;
    @apply p-0 -mt-8 #{!important};
    &:focus-visible {
      @apply p-4 mt-0 #{!important};
    }
  }
}
</style>