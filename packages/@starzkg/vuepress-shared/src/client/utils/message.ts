import '../styles/message.scss'

export class Message {
  private containerElement: HTMLElement

  // generate or make sure message container element
  constructor() {
    const containerId = 'message-container'
    const containerElement = document.getElementById(containerId)

    if (containerElement) this.containerElement = containerElement
    else {
      this.containerElement = document.createElement('div')
      this.containerElement.id = containerId
      document.body.appendChild(this.containerElement)
    }
  }

  pop(html: string, duration = 2000): void {
    const messageElement = document.createElement('div')

    messageElement.className = 'message move-in'
    messageElement.innerHTML = html
    this.containerElement.appendChild(messageElement)

    if (duration > 0)
      setTimeout(() => {
        this.close(messageElement)
      }, duration)
  }

  close(messageElement: HTMLDivElement): void {
    messageElement.className = messageElement.className.replace('move-in', '')
    messageElement.className += 'move-out'

    messageElement.addEventListener('animationend', () => {
      messageElement.remove()
    })
  }
}
