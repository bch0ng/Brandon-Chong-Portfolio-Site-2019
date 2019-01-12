(function() {
    var swiped = false;
    var open = false;
    var resize = false;
    $(window).on('load resize', function() {
        setInterval(function() {
            $('.eyes path').hide(200);
            $('.closed-eyes path').show(200);
            $('.eyes path').delay(200).show(200);
            $('.closed-eyes path').delay(200).hide(200);
        }, 5000);
        if ($(window).width() >= 568) {
            $('#mobile-about-me').hide();
            $('#desktop-container').show();
            $('#nav > a:first-child').on('click', function() {
                $('#macbook #program-code').hide();
                $('#macbook .closed-lid').css('opacity', 0);
                $('#macbook #laptop-body').css('cursor', 'default');
                $('#macbook .close-bar').css('cursor', 'pointer');
                $('#macbook .open-lid').animate({
                    opacity: 1,
                }, 250);
                $('#about-me').show();
            });
            $('#macbook #laptop-body').on('click', function() {
                if (!open) {
                    $('#macbook .closed-lid').css('opacity', 0);
                    $('.guide-text-container').animate({
                        opacity: 0,
                    }, 100).hide();
                    $('#macbook #laptop-body').css('cursor', 'default');
                    $('#macbook .close-bar').css('cursor', 'pointer');
                    $('#macbook .open-lid').animate({
                        opacity: 1,
                    }, 250);
                    setTimeout(() => {
                        $('#desktop-guide-text').addClass('hide-animation');
                        codeLinesMacbook();
                    }, 400);
                }
            });  
            $('#macbook .close-bar').on('click', function () {
                $('#macbook #laptop-body').css('cursor', 'pointer');
                $('#macbook .close-bar').css('cursor', 'default');
                $('#macbook .open-lid').animate({
                    opacity: 0,
                }, 150);
                $('#macbook .closed-lid').animate({
                    opacity: 1
                }, 100);
                $('.guide-text-container').animate({
                    opacity: 1,
                }, 100);
                $('#macbook #program-code').empty();
                open = false;
            });
        } else {
            // Needs to be refactored
            $('#macbook #laptop-body').css('cursor', 'pointer');
            $('#macbook .close-bar').css('cursor', 'default');
            $('#macbook .open-lid').animate({
                opacity: 0,
            }, 150);
            $('#macbook .closed-lid').animate({
                opacity: 1
            }, 100);
            $('.guide-text-container').animate({
                opacity: 1,
            }, 100);
            $('#macbook #program-code').empty();
            open = false;

            $('#desktop-container').hide();
            $('#mobile-about-me-container').show();
            if ($('#phone-lockscreen').attr("y") < 0) {
                $('#mobile-about-me').show();
            }

            let delaySeconds = (new Date()).getSeconds();
            // Init mobile time
            updatePhoneTime();
            setTimeout(() => {
                updatePhoneTime();
                setInterval(() => {
                    updatePhoneTime();
                }, 60000);
            }, (60 - delaySeconds) * 1000);

            $('#phone-lockscreen').draggable({
                        axis: "y",
                        containment: [0, $('#phone-lockscreen').yMax, 0, 0]
                    })
                    .bind('drag', function (event, ui) {
                        // Update coordinates manually, since top/left style props don't work on SVG
                        $('#mobile-guide-text').hide(100);
                        $('#phone-lockscreen').attr('y', ui.position.top);
                    })
                    .bind('dragstop', function (event, ui) {
                        if (ui.position.top <= -200) {  // Animate phone lockscreen going up (unlocked)
                            $('#phone').addClass("scale-up-center");
                            $('#copyright').addClass("slide-bottom");
                            setTimeout(() => {
                                $('#mobile-about-me').show();
                                $('.mobile-nav-container-zoomed').slideDown();
                            }, 150);
                            $('.phone-hand').addClass("hide-animation");
                            $('#phone-lockscreen').animate({
                                y: -770
                            }, {
                                duration: 100,
                                step: function (now) {
                                    $('#phone-lockscreen').attr("y", now);
                                    //$('#phone').addClass("scale-up-center");
                                },
                                complete: function() {
                                    $('#phone').addClass("hide-animation");
                                    setTimeout(() => {
                                        $('#phone').hide();
                                    }, 100);
                                    //$('#phone').hide();
                                }
                            });
                        } else {    // Animate phone lockscreen going back down (still locked)
                            $('#phone-lockscreen').animate({
                                y: 0
                            },
                            {
                                duration: 250,
                                step: function (now) {
                                    $('#phone-lockscreen').attr("y", now);
                                },
                                complete: function() {
                                    // The animation hard codes style values, and prevents the animation working more than once
                                    // so we have to remove the "y: 0px;" from the style values
                                    let updatedStyle = $('#phone-lockscreen').attr('style').replace(" y: 0px;", "");
                                    $('#phone-lockscreen').attr('style', updatedStyle);
                                    $('#mobile-guide-text').show(100);
                                }
                            });
                        }
                    });
            /*
            $("#phone-lockscreen").swipe({
                swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                    $('.guide-text-container').animate({
                        opacity: 0,
                    }, 50);
                    console.log('swiped!');
                    $('#phone').addClass("scale-up-center");
                    $('#phone-lockscreen').addClass("slide-top");
                    $('.phone-hand').animate({
                        opacity: 0,
                    }, 150);
                }
            });
            */
        }

    });

    function updatePhoneTime() {
        let fullDate = new Date();
        let date = fullDate.toLocaleDateString("en-US", {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
        let time = fullDate.toLocaleTimeString("en-US", {
            hour: 'numeric',
            hour12: true,
            minute: '2-digit'
        });
        $('#mobile-date').text(date);
        time = time.substring(0, time.indexOf(" "));
        $('#mobile-time').text(time);
    }

    function codeLinesMacbook() {
        var xStart = 331.78;
        var xMax = 800;
        var yStart = 184.28;
        var yMax = 850;
        var xGap = 15.47;
        var yGap = 26.17;
        var x = xStart;
        var y = yStart;
        var newLine = 0;
        var paragraph = 0;
        var i = 0;

        while (paragraph < 3) {
            var lineLength = Math.round((Math.random() * 100 + 100) * 100) / 100;
            var classType = Math.floor(Math.random() * 3) + 4;

            if ((x + lineLength) >= xMax) {
                x = xStart;
                if (newLine < 10) {
                    newLine++;
                    y += yGap;
                } else {
                    newLine = 0;
                    paragraph++;
                    y += 124.25;
                }
            } else {
                d3.select('#macbook #program-code').append('rect')
                    .attr('id', 'line_' + i)
                    .attr('class', 'open-cls-' + classType)
                    .attr('x', x)
                    .attr('y', y)
                    .attr('rx', 6)
                    .attr('ry', 6)
                    .attr('width', 0)
                    .attr('height', 13.5);
                x += lineLength + xGap;
            }
            $('#macbook #program-code #line_' + i).delay(i * 30).animate({
                width: lineLength,
            }, 20);
            i++;
        }
        open = true;
    }
})();