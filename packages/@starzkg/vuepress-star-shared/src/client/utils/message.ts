export class Message {
  private readonly containerElement: HTMLElement
  private messageElements: Record<number, HTMLDivElement> = {}

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

  pop(html: string, duration = 2000): number {
    const messageElement = document.createElement('div')
    const messageId = Date.now()

    messageElement.className = 'message move-in'
    messageElement.innerHTML = html
    this.containerElement.appendChild(messageElement)
    this.messageElements[messageId] = messageElement

    if (duration > 0)
      setTimeout(() => {
        this.close(messageId)
      }, duration)

    return messageId
  }

  close(messageId?: number): void {
    if (messageId) {
      const messageElement = this.messageElements[messageId]

      messageElement.className = messageElement.className.replace('move-in', '')
      messageElement.className += 'move-out'
      messageElement.addEventListener('animationend', () => {
        messageElement.remove()
        delete this.messageElements[messageId]
      })
    } else
      Object.keys(this.messageElements).forEach((id) => this.close(Number(id)))
  }

  destory(): void {
    document.body.removeChild(this.containerElement)
  }
}
