# APITest Pro - API自动化测试工具

一个功能强大的命令行API自动化测试工具，专为开发者设计。

## 功能特性

1. **命令式启动** - 简洁的命令行接口
2. **多格式配置** - 支持JSON、Excel、ZIP三种格式
3. **详细日志** - 完整的测试过程记录
4. **自动加密** - 支持非对称加密请求Body
5. **性能测试** - 内置性能测试功能
6. **HTML报告** - 生成美观的测试报告
7. **格式转换** - 支持多种格式互转
8. **灵活扩展** - 模块化设计，支持插件

## 内置标签库

APITest Pro提供了丰富的内置功能标签，覆盖以下类别：

### 1. Excel数据关联
- `(Object)` - 对象连接
- `(List)` - 数组连接

### 2. 随机数生成
- `(@RandomDigit(pattern)@RandomDigit)` - 模式化随机数字

### 3. 时间日期处理
- **@SystemTime标签**：
- 语法：(@SystemTime(pattern)@SystemTime)
- 示例：(@SystemTime(YYYY-MM-DD)@SystemTime)
- 结果：2024-01-15
- 格式兼容性：
  - 完全兼容 moment.js (https://momentjs.com/) 格式规范
  - 支持所有标准的moment.js格式化令牌
  - 默认格式：YYYY-MM-DD HH:mm:ss
- 常用格式令牌：
  - YYYY - 4位年份 (2024)
  - MM - 2位月份 (01)
  - DD - 2位日期 (15)
  - HH - 24小时制 (14)
  - mm - 分钟 (30)
  - ss - 秒 (25)
  - x - Unix时间戳毫秒 (1705329025000)
  - X - Unix时间戳秒 (1705329025)
- 完整格式令牌请参考：https://momentjs.com/docs/#/displaying/format/
- 常用示例：
  - (@SystemTime@SystemTime) → 2024-01-15 14:30:25
  - (@SystemTime(YYYY/MM/DD)@SystemTime) → 2024/01/15
  - (@SystemTime(MMMM Do YYYY, h:mm:ss a)@SystemTime) → January 15th 2024, 2:30:25 pm
  - (@SystemTime(x)@SystemTime) → 1705329025000
  - (@SystemTime(YYYY-MM-DDTHH:mm:ssZ)@SystemTime) → 2024-01-15T14:30:25+08:00

### 4. 字符串处理
- 随机字母生成：`(@RandomLower(pattern)@RandomLower)`, `(@RandomUpper(pattern)@RandomUpper)`
- 哈希计算：支持Hash、Hash1、Hash224、Hash256、Hash384、Hash512多种算法
  - `(@Hash(targetPath, isHashByValue)@Hash)`
  - `(@Hash256(targetPath, isHash256ByValue)@Hash256)`
  - `(@Hash512(targetPath, isHash512ByValue)@Hash512)`

### 5. 逻辑处理
- 数据关联：`(@SameAs(targetPath)@SameAs)`
- 文件操作：`(@SaveAs(...)@SaveAs)`, `(@File(...)@File)`
- 测试用例关联：`(@FromAPIResponse(...)@FromAPIResponse)`

### 6. 特殊值处理
- 空值设置：`(Null)`, `(Blank)`
- 附件处理：`(@Attachment(targetPath)@Attachment)`

### 7. 断言处理
- 非空断言：`(NotNull)`
- 模式匹配：`(@Match(expectedValue, positionMatch)@Match)`

详细使用方法和示例请查看[完整标签库文档](tag-library.html)。

## 快速开始

### 安装
```bash
# 下载安装包
wget https://your-domain.com/apitest-pro.zip
unzip apitest-pro.zip
cd apitest-pro