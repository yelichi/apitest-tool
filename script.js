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

// 优化版动画效果观察器
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 添加一点随机延迟，让动画更自然
            const randomDelay = Math.random() * 0.1;
            entry.target.style.animationDelay = `calc(var(--animation-delay, 0s) + ${randomDelay}s)`;
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.feature-card, .step, .download-card, .overview-card').forEach(el => {
    // 为每个元素设置自定义的动画延迟变量
    const index = Array.from(el.parentNode.children).indexOf(el);
    el.style.setProperty('--animation-delay', `${(index + 1) * 0.05}s`);
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
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* 功能卡片动画延迟 - 调整为更协调的间隔 */
    /* 第一行（1-3个卡片） */
    .feature-card:nth-child(1) { --animation-delay: 0.1s; }
    .feature-card:nth-child(2) { --animation-delay: 0.15s; }
    .feature-card:nth-child(3) { --animation-delay: 0.2s; }
    
    /* 第二行（4-6个卡片） */
    .feature-card:nth-child(4) { --animation-delay: 0.25s; }
    .feature-card:nth-child(5) { --animation-delay: 0.3s; }
    .feature-card:nth-child(6) { --animation-delay: 0.35s; }
    
    /* 第三行（7-9个卡片） */
    .feature-card:nth-child(7) { --animation-delay: 0.4s; }
    .feature-card:nth-child(8) { --animation-delay: 0.45s; }
    .feature-card:nth-child(9) { --animation-delay: 0.5s; }
    
    /* 标签概览卡片动画延迟 */
    .overview-card:nth-child(1) { --animation-delay: 0.2s; }
    .overview-card:nth-child(2) { --animation-delay: 0.25s; }
    .overview-card:nth-child(3) { --animation-delay: 0.3s; }
    .overview-card:nth-child(4) { --animation-delay: 0.35s; }
    
    /* 步骤卡片动画延迟 */
    .step:nth-child(1) { --animation-delay: 0.1s; }
    .step:nth-child(2) { --animation-delay: 0.2s; }
    .step:nth-child(3) { --animation-delay: 0.3s; }
    .step:nth-child(4) { --animation-delay: 0.4s; }
    
    /* 下载卡片动画延迟 */
    .download-card:nth-child(1) { --animation-delay: 0.1s; }
    .download-card:nth-child(2) { --animation-delay: 0.2s; }
    .download-card:nth-child(3) { --animation-delay: 0.3s; }
`;
document.head.appendChild(style);

// 添加交错动画效果（可选，更高级的效果）
const staggeredStyle = document.createElement('style');
staggeredStyle.textContent = `
    /* 交错动画效果 - 让卡片按列交错出现 */
    @media (min-width: 768px) {
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        
        /* 第一列（1,4,7卡片） */
        .feature-card:nth-child(3n+1) {
            animation-delay: var(--animation-delay, 0.1s);
        }
        
        /* 第二列（2,5,8卡片） */
        .feature-card:nth-child(3n+2) {
            animation-delay: calc(var(--animation-delay, 0.15s) + 0.05s);
        }
        
        /* 第三列（3,6,9卡片） */
        .feature-card:nth-child(3n+3) {
            animation-delay: calc(var(--animation-delay, 0.2s) + 0.1s);
        }
    }
    
    /* 更流畅的动画缓动函数 */
    .feature-card.animate-in {
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;
document.head.appendChild(staggeredStyle);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为功能标签添加悬停效果
    document.querySelectorAll('.tag-examples code, .tag-code, .detail-code').forEach(tag => {
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
    document.querySelectorAll('.tag-code, .tag-examples code, .detail-code').forEach(code => {
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
    
    // 添加页面加载时的初始动画
    setTimeout(() => {
        // 触发第一个功能卡片的动画
        const firstFeatureCard = document.querySelector('.feature-card');
        if (firstFeatureCard) {
            firstFeatureCard.classList.add('animate-in');
        }
    }, 300);
});