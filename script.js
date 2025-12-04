// 代码选项卡切换功能
function showCode(format) {
    // 移除所有选项卡的active类
    document.querySelectorAll('.code-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 隐藏所有代码块
    document.querySelectorAll('.code-block').forEach(block => {
        block.classList.remove('active');
    });
    
    // 激活当前选项卡
    event.target.classList.add('active');
    
    // 显示对应的代码块
    const codeBlock = document.getElementById(`${format}-code`);
    if (codeBlock) {
        codeBlock.classList.add('active');
    }
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 页面滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.feature-card, .step, .download-card').forEach(el => {
    observer.observe(el);
});

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .feature-card:nth-child(4) { animation-delay: 0.4s; }
    .feature-card:nth-child(5) { animation-delay: 0.5s; }
    .feature-card:nth-child(6) { animation-delay: 0.6s; }
    .feature-card:nth-child(7) { animation-delay: 0.7s; }
    .feature-card:nth-child(8) { animation-delay: 0.8s; }
`;
document.head.appendChild(style);

// 功能标签演示交互
function initTagsDemo() {
    // 创建功能标签表格
    const tagsTable = `
        <div class="config-example">
            <div class="config-header">
                <h4>完整的功能标签列表</h4>
                <div class="config-tabs">
                    <button class="config-tab active" onclick="showTagCategory('all')">全部</button>
                    <button class="config-tab" onclick="showTagCategory('random')">随机数</button>
                    <button class="config-tab" onclick="showTagCategory('date')">时间日期</button>
                    <button class="config-tab" onclick="showTagCategory('string')">字符串</button>
                </div>
            </div>
            <div class="config-content">
                <table class="tags-table">
                    <thead>
                        <tr>
                            <th width="200">标签</th>
                            <th width="120">类型</th>
                            <th>描述</th>
                            <th width="200">示例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tag-category random">
                            <td><code>\${RANDOM_INT(min, max)}</code></td>
                            <td><span class="tag-type random">随机数</span></td>
                            <td>生成指定范围内的随机整数</td>
                            <td><code>\${RANDOM_INT(1, 100)}</code></td>
                        </tr>
                        <tr class="tag-category random">
                            <td><code>\${RANDOM_FLOAT(min, max, decimal)}</code></td>
                            <td><span class="tag-type random">随机数</span></td>
                            <td>生成指定范围的随机浮点数</td>
                            <td><code>\${RANDOM_FLOAT(10.5, 99.9, 2)}</code></td>
                        </tr>
                        <tr class="tag-category random">
                            <td><code>\${RANDOM_STRING(length)}</code></td>
                            <td><span class="tag-type random">随机数</span></td>
                            <td>生成指定长度的随机字符串</td>
                            <td><code>\${RANDOM_STRING(8)}</code></td>
                        </tr>
                        <tr class="tag-category date">
                            <td><code>\${NOW}</code></td>
                            <td><span class="tag-type date">时间日期</span></td>
                            <td>当前时间戳（毫秒）</td>
                            <td><code>1642368000000</code></td>
                        </tr>
                        <tr class="tag-category date">
                            <td><code>\${DATE(offset, format)}</code></td>
                            <td><span class="tag-type date">时间日期</span></td>
                            <td>计算日期偏移并格式化</td>
                            <td><code>\${DATE(+7d, 'YYYY-MM-DD')}</code></td>
                        </tr>
                        <tr class="tag-category string">
                            <td><code>\${UUID}</code></td>
                            <td><span class="tag-type string">字符串</span></td>
                            <td>生成UUID版本4</td>
                            <td><code>550e8400-e29b-41d4-a716-446655440000</code></td>
                        </tr>
                        <tr class="tag-category string">
                            <td><code>\${MD5(text)}</code></td>
                            <td><span class="tag-type encrypt">加密</span></td>
                            <td>计算字符串的MD5哈希值</td>
                            <td><code>\${MD5('hello')}</code></td>
                        </tr>
                        <tr class="tag-category string">
                            <td><code>\${BASE64(text)}</code></td>
                            <td><span class="tag-type encrypt">加密</span></td>
                            <td>Base64编码字符串</td>
                            <td><code>\${BASE64('hello')}</code></td>
                        </tr>
                        <tr class="tag-category string">
                            <td><code>\${SUBSTR(str, start, length)}</code></td>
                            <td><span class="tag-type string">字符串</span></td>
                            <td>截取字符串子串</td>
                            <td><code>\${SUBSTR('hello', 0, 3)}</code></td>
                        </tr>
                        <tr class="tag-category string">
                            <td><code>\${UPPERCASE(str)}</code></td>
                            <td><span class="tag-type string">字符串</span></td>
                            <td>转换为大写</td>
                            <td><code>\${UPPERCASE('hello')}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // 插入到页面中（在功能标签部分之后）
    const featureTagsSection = document.querySelector('.feature-tags-showcase');
    if (featureTagsSection) {
        featureTagsSection.insertAdjacentHTML('afterend', tagsTable);
    }
}

// 显示特定类别的标签
function showTagCategory(category) {
    // 更新标签激活状态
    document.querySelectorAll('.config-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 显示/隐藏表格行
    const rows = document.querySelectorAll('.tags-table tbody tr');
    rows.forEach(row => {
        if (category === 'all') {
            row.style.display = '';
        } else {
            if (row.classList.contains(`tag-category-${category}`)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// 动态生成功能标签展示
function createTagsShowcase() {
    const showcaseSection = `
        <section class="feature-tags-showcase">
            <div class="tags-showcase-content">
                <h3>强大的内置功能标签</h3>
                <p>无需编写额外代码，直接在配置文件中使用功能标签，自动生成测试数据</p>
                
                <div class="tags-floating">
                    <div class="floating-tag">\${RANDOM_INT(1,100)}</div>
                    <div class="floating-tag">\${NOW}</div>
                    <div class="floating-tag">\${UUID}</div>
                    <div class="floating-tag">\${DATE(+1d)}</div>
                    <div class="floating-tag">\${MD5(text)}</div>
                </div>
                
                <a href="#usage" class="btn-primary" style="background: white; color: #667eea;">
                    <i class="fas fa-code"></i> 查看使用示例
                </a>
            </div>
        </section>
    `;
    
    // 插入到功能特性部分之后
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        featuresSection.insertAdjacentHTML('afterend', showcaseSection);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    createTagsShowcase();
    initTagsDemo();
    
    // 为功能标签添加悬停效果
    document.querySelectorAll('.tag-examples code, .floating-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 复制功能标签代码
    document.querySelectorAll('.tag-examples code').forEach(code => {
        code.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // 显示复制成功提示
                const originalText = this.textContent;
                this.textContent = '已复制!';
                this.style.background = '#4caf50';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
                }, 1500);
            });
        });
    });
});