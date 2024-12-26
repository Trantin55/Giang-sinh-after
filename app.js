var boxgift = document.querySelector('.box-gift')
var Close = document.querySelector('.fa-xmark')
var boxContent = document.querySelector('.box-content')
var content =document.querySelector('.content')

boxgift.onclick = function(){
    boxgift.classList.toggle('active')
    // boxContent.classList.add('active')
}

let isAnimating = false;

function typeText(element, delay = 50) {
    return new Promise(resolve => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        const characters = text.split('').map(char => {
            const span = document.createElement('span');
            span.textContent = char;
            element.appendChild(span);
            return span;
        });
        
        characters.forEach((span, index) => {
            setTimeout(() => {
                if (!element.isConnected) return;
                span.classList.add('show');
                
                if (index === characters.length - 1) {
                    // Không reset opacity, giữ nguyên text đã hiển thị
                    element.classList.add('completed');
                    resolve();
                }
            }, index * delay);
        });
    });
}

document.querySelector('.content').onclick = async function() {
    if (isAnimating) return;
    isAnimating = true;
    
    const boxContent = document.querySelector('.box-content');
    boxContent.classList.add('active');
    
    const text2 = document.getElementById('text2');
    const text3 = document.getElementById('text3');
    
    try {
        // Hiển thị container ngay từ đầu
        text2.style.opacity = '1';
        text3.style.opacity = '0'; // Chỉ ẩn text3 ban đầu
        
        // Chạy text2
        await typeText(text2, 30);
        
        // Hiển thị text3 và bắt đầu animation ngay
        text3.style.opacity = '1';
        await typeText(text3, 30);
        
    } catch (error) {
        console.error('Animation error:', error);
    } finally {
        isAnimating = false;
    }
}

// Thêm xử lý sự kiện cho nút đóng
Close.onclick = function() {
    boxContent.classList.remove('active');
    // Reset lại trạng thái của text2 và text3
    const text2 = document.getElementById('text2');
    const text3 = document.getElementById('text3');
    text2.style.opacity = '0';
    text3.style.opacity = '0';
    isAnimating = false; // Reset trạng thái animation
}
