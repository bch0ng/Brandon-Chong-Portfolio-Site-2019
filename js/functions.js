(function() {
    let open = false;   // True if laptop is opened, false otherwise  

    $(window).on('load resize', function() {
        if ($(window).width() >= 568) {     // For landscape phones, tablets, and desktops
            // Animation for SVG person blinking; blinks every 5 seconds
            setInterval(function() {
                $('.eyes path').hide(200);
                $('.closed-eyes path').show(200);
                $('.eyes path').delay(200).show(200);
                $('.closed-eyes path').delay(200).hide(200);
            }, 5000);
            // Setting up desktop SVG interactions and hide mobile content if visible
            $('.mobile-nav-container-zoomed').hide();
            $('#mobile-about-me').hide();
            $('#desktop-container').show();
            // Opens up laptop screen with about page when nav item is clicked
            $('#nav > a:first-child').on('click', function() {
                $('#laptop #program-code').hide();
                $('#laptop-container .closed-lid').css('opacity', 0);
                $('#laptop-container #laptop-body').css('cursor', 'default');
                $('#laptop-container .close-bar').css('cursor', 'pointer');
                $('#laptop-container .open-lid').animate({
                    opacity: 1,
                }, 250);
                $('#about-me').show();
                setTimeout(() => {
                    $('#desktop-guide-text').addClass('hide-animation');
                }, 1500);
            });
            // Shows a test SVG animation I used If user clicks on macbook to open before clicking About Me
            $('#laptop-container #laptop-body').on('click', function() {
                if (!open) {
                    $('#laptop-container .closed-lid').css('opacity', 0);
                    $('.guide-text-container').animate({
                        opacity: 0,
                    }, 100).hide();
                    $('#laptop-container #laptop-body').css('cursor', 'default');
                    $('#laptop-container .close-bar').css('cursor', 'pointer');
                    $('#laptop-container .open-lid').animate({
                        opacity: 1,
                    }, 250);
                    setTimeout(() => {
                        codeLinesMacbook();
                        open = true;
                    }, 400);
                    setTimeout(() => {
                        $('#desktop-guide-text').addClass('hide-animation');
                    }, 1500);
                }
            });
            // Closes macbook
            $('#laptop-container .close-bar').on('click', function () {
                $('#laptop-container #laptop-body').css('cursor', 'pointer');
                $('#laptop-container .close-bar').css('cursor', 'default');
                $('#laptop-container .open-lid').animate({
                    opacity: 0,
                }, 150);
                $('#laptop-container .closed-lid').animate({
                    opacity: 1
                }, 100);
                $('.guide-text-container').animate({
                    opacity: 1,
                }, 100);
                $('#laptop #program-code').empty();
                open = false;
            });
        } else {    // For Mobile
            // Closes and hides non-mobile stuff
            $('#laptop-container #laptop-body').css('cursor', 'pointer');
            $('#laptop-container .close-bar').css('cursor', 'default');
            $('#laptop-container .open-lid').animate({
                opacity: 0,
            }, 150);
            $('#laptop-container .closed-lid').animate({
                opacity: 1
            }, 100);
            $('.guide-text-container').animate({
                opacity: 1,
            }, 100);
            $('#laptop #program-code').empty();
            open = false;
            $('#desktop-container').hide();
            $('#mobile-about-me-container').show();
            if ($('#phone-lockscreen').attr("y") < 0) {
                $('#mobile-about-me').show();
            }

            // Lockscreen time
            let delaySeconds = (new Date()).getSeconds();
            // Init mobile time
            updatePhoneTime();
            setTimeout(() => {
                updatePhoneTime();
                setInterval(() => {
                    updatePhoneTime();
                }, 60000);
            }, (60 - delaySeconds) * 1000);

            // Lockscreen "slide to unlock" feature
            // Issue (2019-01-11): Prevents iOS Chrome's pull to refresh
            //                     because it detects it as a drag event.
            $('#phone-lockscreen').draggable({
                        axis: "y",
                        containment: [0, $('#phone-lockscreen').yMax, 0, 0]
                    })
                    .bind('drag', function (event, ui) {
                        // Update y-coordinate manually, since top style prop don't work on SVGs
                        $('#mobile-guide-text').hide(100);
                        $('#phone-lockscreen').attr('y', ui.position.top);
                    })
                    .bind('dragstop', function (event, ui) {
                        if (ui.position.top <= -200) {  // Animate phone lockscreen going up if dragged more than 200px (unlocked)
                            // Animation to make it look like phone screen is filling up the user's screen
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
                        } else {    // Animate phone lockscreen going back down if < 200px dragged (still "locked")
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
            }
        });

    /**
     * Updates the time and date for phone SVG's clock on mobile.
     */
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

    /**
     * Test SVG animation made while messing around.
     * No problem if removed (and all references removed as well),
     * but kept for fun.
     */
    function codeLinesMacbook() {
        let xStart = 331.78;
        let yStart = 184.28;
        let xMax = 800;
        let yMax = 850;
        let xGap = 15.47;
        let yGap = 26.17;
        let x = xStart;
        let y = yStart;
        let newLine = 0;
        let paragraph = 0;
        let i = 0;

        while (paragraph < 3) {
            let lineLength = Math.round((Math.random() * 100 + 100) * 100) / 100;
            let classType = Math.floor(Math.random() * 3) + 4;
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
                d3.select('#laptop #program-code').append('rect')
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
            $('#laptop #program-code #line_' + i).delay(i * 30).animate({
                width: lineLength,
            }, 20);
            i++;
        }
    }
})();