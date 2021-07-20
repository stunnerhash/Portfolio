
(function ($) {
    var Preloader = function () {
        $("html").addClass('preload');
        $(window).on('load', function () {
            $("#loader").fadeOut("slow", function () {
                $("#preloader").delay(300).fadeOut("slow");
            });
            $("html").removeClass('preload');
            $("html").addClass('loaded');
        });
    }; 
    var Animation = function () {
        var SEPARATION = 100,
            AMOUNTX = 30,
            AMOUNTY = 30;
        var camera, scene, renderer;
        var particles, particle, count = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        var mouseX = -windowHalfX,
            mouseY = -windowHalfY;

        function init() {
            camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 100, 2200);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            particles = new Array();
            var PI2 = Math.PI * 2;
            var material = new THREE.SpriteCanvasMaterial({
                color: 0xffffff,
                program: function (context) {
                    context.beginPath();
                    context.arc(0, 0, 0.25, 0, PI2, true);
                    context.fill();
                }
            });
            var i = 0;
            for (var ix = 0; ix < AMOUNTX; ix++) {
                for (var iy = 0; iy < AMOUNTY; iy++) {
                    particle = particles[i++] = new THREE.Sprite(material);
                    particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                    particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                    scene.add(particle);
                }
            }
            renderer = new THREE.CanvasRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            $('#wave').prepend(renderer.domElement);

            $(document).on('mousemove', function (event) {
                mouseX = event.clientX * 0.7 - windowHalfX;
                mouseY = event.clientY * 0.3 - windowHalfY;
            }).trigger('mousemouve');
   
			$(window).on('resize', function () {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            render();
        }

        function render() {
            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (-mouseY - camera.position.y) * .03;
            camera.position.z = 750;
            camera.lookAt(scene.position);

            var i = 0;
            for (var ix = 0; ix < AMOUNTX; ix++) {
                for (var iy = 0; iy < AMOUNTY; iy++) {
                    particle = particles[i++];
                    particle.position.y = (Math.sin((ix + count) * 0.25) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                    particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.25) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
                }
            }
            renderer.render(scene, camera);
            count += 0.05;
            requestAnimationFrame(render);
        }
        return init();
    }
	
    var SmoothScroll = function () {
        $('.smoothscroll').on('click', function (event) {
            var $target = $(this.hash);
            event.preventDefault();
            event.stopPropagation();
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 800, 'swing');
        });
    };
	
    var AOSStart = function () {
        AOS.init({
            offset: 50,
            duration: 300,
            easing: 'ease-in-sine',
            delay: 250,
            once: true,
            disable: 'mobile'
        });
    };

	var typed = new Typed (".typing", {
		strings: ["Developer","Designer","Freelancer","Student","Programmer","","Coder"],
		typeSpeed: 100,
		backSpeed:50,
		loop: true
	});

    (function () {
        Preloader();
        Animation();
        SmoothScroll();
        AOSStart();
    })();
})
(jQuery);
	