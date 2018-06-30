(function() {
    $(window).on('load', function() {
        if ($(window).width() >= 768) {
            codeLinesMacbook();  
        } else {
            codeLinesPhone();
        }
    });

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
                d3.select('#macbook #program_code').append('rect')
                    .attr('id', 'line_' + i)
                    .attr('class', 'cls-' + classType)
                    .attr('x', x)
                    .attr('y', y)
                    .attr('rx', 6)
                    .attr('ry', 6)
                    .attr('width', 0)
                    .attr('height', 13.5);
                x += lineLength + xGap;
            }
            $('#macbook #program_code #line_' + i).delay(i * 30).animate({
                width: lineLength,
            }, 20);
            i++;
        }
    }

    function codeLinesPhone() {
        var xStart = 88.57;
        var xMax = 400;
        var yStart = 162.04;
        var yMax = 610;
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
                if (newLine < 4) {
                    newLine++;
                    y += yGap;
                } else {
                    newLine = 0;
                    paragraph++;
                    y += 50;
                }
            } else {
                d3.select('#phone #program_code_mobile').append('rect')
                    .attr('id', 'line_' + i)
                    .attr('class', 'cls-' + classType)
                    .attr('x', x)
                    .attr('y', y)
                    .attr('rx', 6)
                    .attr('ry', 6)
                    .attr('width', 0)
                    .attr('height', 13.5);
                x += lineLength + xGap;
            }
            $('#phone #program_code_mobile #line_' + i).delay(i * 30).animate({
                width: lineLength,
            }, 20);
            i++;
        }
    }
})();