export function enhance(form: HTMLFormElement, submit: any) {
    async function handleSubmit(event: SubmitEvent) {
      event.preventDefault()
  
      const data = new FormData(form)
  
      await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'x-sveltekit-action': 'true'
        }
      })
    }
  
    return {
      destroy: () => {
        form.removeEventListener('submit', handleSubmit)
      },
    }
  }
