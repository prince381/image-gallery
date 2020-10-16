document.addEventListener('DOMContentLoaded',function() {

    const pictures = [];

    for(let i = 1; i <= 10; i++) {
        pictures.push(`man${i}.jpg`);
        pictures.push(`woman${i}.jpg`);
    }

    const gallery = document.querySelector('.images-wrapper');

    function appendImage(src,container) {
        const imgSrc = `images/${src}`,
              img = document.createElement('img'),
              imgbox = document.createElement('div');
        imgbox.setAttribute('class','imgbox');
        imgbox.setAttribute('data-attr',imgSrc);
        img.setAttribute('src',imgSrc);
        imgbox.appendChild(img);
        container.appendChild(imgbox);
    }

    pictures.forEach(pic => {
       appendImage(pic,gallery);
    });

    showImages('all');

    $('input[type="radio"]').click(function() {
        let radioVal = $('input[type="radio"]:checked').val();
        showImages(radioVal);
    });

    function showImages(category) {
        let imgBoxes = document.querySelectorAll('.imgbox');
        if(category === 'all') {
            imgBoxes.forEach(box => {
                box.style.display = 'block';
            });
        } else if (category === 'man') {
            imgBoxes.forEach(box => {
                let [attr,img] = box.getAttribute('data-attr').split('/');
                if(img.match(/^man\w/ig)) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            })
        } else {
            imgBoxes.forEach(box => {
                let [attr,img] = box.getAttribute('data-attr').split('/');
                if(img.match(/^wo\w/ig)) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        }
    }

    window.addEventListener('click',function(e) {
        if (e.target.classList.contains('image-modal')) {
            e.target.classList.remove('active');
        }
    });

    const imageModal = document.querySelector('.image-modal'),
          images = document.querySelectorAll('.imgbox'),
          imageContent = document.querySelector('.image-content img'),
          prevImg = document.querySelector('.prev'),
          nextImg = document.querySelector('.next'),
          times = document.querySelector('.times');

    images.forEach(img => {
        img.addEventListener('click',function() {
            let imgSrc = this.getAttribute('data-attr');
            imageContent.setAttribute('src',imgSrc);
            imageModal.classList.add('active');
        });
    });

    times.addEventListener('click',function() {
        imageModal.classList.remove('active');
    });

    function moveNext() {
        let radioVal = $('input[type="radio"]:checked').val(),
            filteredPics,
            [_,img] = $('.image-content img').attr('src').split('/');
        if(radioVal === 'all') {
            filteredPics = pictures;
        } else if (radioVal === 'man') {
            filteredPics = pictures.filter(pic => {
                return pic.match(/^man\w/ig);
            });
        } else {
            filteredPics = pictures.filter(pic => {
                return pic.match(/^wo\w/ig);
            });
        }

        let currentIndex = filteredPics.indexOf(img) + 1,
            newImg;

        if(currentIndex > filteredPics.length - 1) {
            currentIndex = 0;
            newImg = filteredPics[currentIndex];
        } else {
            newImg = filteredPics[currentIndex++];
        }

        anime.timeline()
            .add({
                targets: '.image-content',
                easing: 'easeOutQuad',
                duration: 500,
                rotateY: ['0deg','88deg'],
                rotateZ: ['0deg','30deg'],
                complete: function() {
                    document.querySelector('.image-content img').setAttribute('src',`images/${newImg}`);
                }
            })
            .add({
                targets: '.image-content',
                easing: 'easeOutElastic',
                duration: 600,
                rotateY: ['88deg','0deg'],
                rotateZ: ['30deg','0deg'],
                elasticity: 1000
            });

    }

    function movePrev() {
        let radioVal = $('input[type="radio"]:checked').val(),
            filteredPics,
            [_,img] = $('.image-content img').attr('src').split('/');
        if(radioVal === 'all') {
            filteredPics = pictures;
        } else if (radioVal === 'man') {
            filteredPics = pictures.filter(pic => {
                return pic.match(/^man\w/ig);
            });
        } else {
            filteredPics = pictures.filter(pic => {
                return pic.match(/^wo\w/ig);
            });
        }

        let currentIndex = filteredPics.indexOf(img) - 1,
            newImg;

        if(currentIndex < 0) {
            currentIndex = filteredPics.length - 1;
            newImg = filteredPics[currentIndex];
        } else {
            newImg = filteredPics[currentIndex--];
        }

        anime.timeline()
            .add({
                targets: '.image-content',
                easing: 'easeOutQuad',
                duration: 500,
                rotateY: ['0deg','-88deg'],
                rotateZ: ['0deg','-30deg'],
                complete: function() {
                    document.querySelector('.image-content img').setAttribute('src',`images/${newImg}`);
                }
            })
            .add({
                targets: '.image-content',
                easing: 'easeOutElastic',
                duration: 600,
                rotateY: ['-88deg','0deg'],
                rotateZ: ['-30deg','0deg'],
                elasticity: 1000
            });
    }

    nextImg.addEventListener('click',moveNext);
    prevImg.addEventListener('click',movePrev);

    window.addEventListener('keydown',function(e) {
        if(e.key === 'ArrowRight') moveNext();
        else if(e.key === 'ArrowLeft') movePrev();
    });

})