interface Project {
  name: string
  link: string
  icon?: string
  description?: string
}

export interface ProfileOptions {
  /**
   * 姓名
   */
  name?: string
  /**
   * 名
   */
  firstName?: string
  /**
   * 姓
   */
  lastName?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 签名
   */
  intro?: string
  /**
   * 博客
   */
  blog?: string
  /**
   * 工作单位
   */
  company?: string
  /**
   * 位置
   */
  location?: string
  /**
   * 账号
   */
  accounts?: Record<string, string>
  /**
   * 项目
   */
  projects?: Project[]
}
