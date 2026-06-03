// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 点击导航链接后关闭移动菜单
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // 图片滚动展示功能
    initGallerySlider();
});

// 图片滚动展示初始化
function initGallerySlider() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;
    
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    let totalSlides = Math.ceil(items.length / itemsPerView);
    
    // 创建指示点
    createDots();
    
    // 更新指示点
    updateDots();
    
    // 上一张按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    // 下一张按钮事件
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });
    }
    
    // 自动播放
    let autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    // 鼠标悬停时暂停自动播放
    const slider = document.querySelector('.gallery-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            }, 5000);
        });
    }
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', function() {
        itemsPerView = getItemsPerView();
        totalSlides = Math.ceil(items.length / itemsPerView);
        createDots();
        updateSlider();
    });
    
    // 获取每页显示的项目数
    function getItemsPerView() {
        if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 992) {
            return 2;
        } else {
            return 3;
        }
    }
    
    // 创建指示点
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', function() {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // 更新指示点状态
    function updateDots() {
        const dots = document.querySelectorAll('.gallery-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 更新滑动器位置
    function updateSlider() {
        const itemWidth = items[0].offsetWidth + 20; // 包括gap
        const translateX = -currentIndex * itemsPerView * itemWidth;
        track.style.transform = `translateX(${translateX}px)`;
        updateDots();
    }
    
    // 初始化滑动器位置
    updateSlider();
}