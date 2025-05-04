````markdown
# BRR IT 仪表盘

> **在线演示（建议直接试用）：**  
> https://brr-tech-test.vercel.app/

**仓库地址：** https://github.com/shihuayin/brr-tech-test.git

---

## 概览

本项目是一个 React + Firebase 的内部员工仪表盘。包含员工目录、IT 请求、工单跟踪和待办列表等功能。

- **数据库 Firebase**  
  为了模拟真实项目中的多端协作场景，所有数据（员工列表、工单、待办）都保存在 Firebase Firestore（实时数据库）中。这样可以跨设备、跨用户同步数据。
- **示例数据已预先导入**  
  我已通过 `scripts/import.js` 将示例数据导入到 Firestore，因此没有在仓库中上传 `serviceAccountKey.json`。
- **登录模拟**
  - Welcome 页面通过 `sessionStorage` 存储当前用户，点击 “Login as User”/“Login as Admin” 后刷新也会保留该状态。
- **Firebase 配置**  
  为方便评审，`firebase.js` 中的客户端初始化配置直接提交至仓库，无需额外环境变量。
  > ⚠️ 说明，生产环境需要将 `firebase.js` 中的敏感字段提取到 `.env` 并在 `.gitignore` 中忽略。

---

## 本地快速启动

1. 克隆仓库
   ```bash
   git clone https://github.com/shihuayin/brr-tech-test.git
   cd brr-tech-test
   ```
````

2. 安装依赖

   ```bash
   npm install
   ```

3. 启动开发服务器

   ```bash
   npm start
   ```

   访问 [http://localhost:3000](http://localhost:3000)，点击 “Login as User” / “Login as Admin” 进入仪表盘。

4. 运行单元测试

   ```bash
   npm test
   ```

---

## 已完成的基础功能

- **首页仪表盘**

  - 欢迎语
  - **Unresolved Tickets** 卡片：

    - 管理员：统计并显示所有用户的“未解决”工单总数（包括 **Open** 和 **In Progress** 状态）
    - 普通用户：统计并显示自己提交的“未解决”工单总数（包括 **Open** 和 **In Progress** 状态）

  - **My Pending Tasks** 卡片：显示当前用户未完成的待办事项数量

  - **Latest Updates** 列表：

    - 从可见工单中取 **最新 3 条**
    - 按“创建时间”降序排序（最新在前）
    - 管理员可见“提交人”信息（用户名 + 邮件链接）

- **员工目录**

  - 普通用户：查看每位员工的姓名、职位、邮箱和在线状态（active/inactive）
  - 管理员：额外可见“最后登录时间”、“Google Drive 存储用量”、“当前设备类型”

- **IT 请求**

  - 从下拉列表选择问题类型
  - 填写描述并模拟文件上传
    - 选中文件后显示 `Uploading...`，2 秒后变为 `Uploaded: 文件名`
  - “Submit Request” 按钮在填写完整后可提交

- **工单列表（Tickets）**

  - **普通用户**：只展示当前用户自己提交的工单
  - **管理员**：展示所有用户提交的工单
  - 可按状态筛选（All / Open / In Progress / Resolved）
  - 排序逻辑：

    1. 按状态优先级分组：`Open` → `In Progress` → `Resolved`
    2. 同一状态组内再按创建时间降序展示，最新的永远排在最前

- **待办事项**

  - 添加、编辑、删除任务
  - 勾选复选框标记完成／未完成，并自动将已完成项置后

---

## 已完成的加分项

- **管理员视图**
  员工目录展示最后登录、Drive 用量、设备
- **路由导航**
  页面切换基于 React Router
- **样式方案**
  使用 Tailwind CSS
- **可复用组件**
  `Card`、`FormField`、`StaffCard`、`TicketRow`、`TodoItem`
- **单元测试**
  针对 `Card`、`StaffCard`、`TicketRow`、`ITRequest` 进行了测试

---

## 尚未完成的加分项

- **TypeScript**
  当前全部使用 JavaScript

---

## 未来改进

- **真实用户认证**：接入 Firebase Auth，持久化登录状态
- **环境变量管理**：将 `src/firebase.js` 配置提取到 `.env` 并保护密钥
- **文件真实上传**：集成 Firebase Storage，支持实际文件存储与下载
- **列表分页/搜索**：员工、工单列表增加分页或关键词搜索功能

```

```
