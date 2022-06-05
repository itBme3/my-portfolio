

export const globalSeo: { siteName: string; description: string; image: string } = {
  siteName: 'Frontend Dev | Bobby Moynihan',
  description: 'Portfolio Site',
  image: '/favicons/favicon@252x.png'
}

export function getMetaTags(seo: { title?: string; description?: string; image?: string }) {
  const tags = []

  if (seo.title) {
    tags.push(
      {
        property: 'og:title',
        content: seo.title
      },
      {
        name: 'twitter:title',
        content: seo.title
      }
    )
  }
  if (seo.description) {
    tags.push(
      {
        name: 'description',
        content: seo.description
      },
      {
        property: 'og:description',
        content: seo.description
      },
      {
        name: 'twitter:description',
        content: seo.description
      }
    )
  }
  if (seo.image) {
    tags.push(
      {
        name: 'image',
        content: seo.image
      },
      {
        property: 'og:image',
        content: seo.image
      },
      {
        name: 'twitter:image',
        content: seo.image
      }
    )
  }
  tags.push({ name: 'twitter:card', content: 'summary_large_image' })

  return tags
}


export const seoHead = (page: { title?: string; description?: string; image?: string }) => {
  const { title = globalSeo.siteName, image = globalSeo.image, description = globalSeo.description } = page;
    const seo:{title:string; image: string; description: string; [key:string]: string} = { title, image, description };
    const fullSeo:{[key:string]: string} = {
      ...Object.keys(seo).reduce((acc, key) => {
        return { ...acc, [key]: seo[key] }
      }, {})
    }
    const meta = getMetaTags(fullSeo)
    return {
      titleTemplate: fullSeo.title === globalSeo.siteName ? fullSeo.title : `%s | ${globalSeo.siteName}`,
      title: fullSeo.title,
      meta
    }
}