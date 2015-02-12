/** Vertically scrolling slide show, cf Valentino
    <script src='js/VerticalSlideShow.js'></script>
    <script>
        jQuery(document).ready( function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        new VerticalSlideShow({
            container: '#container',
            selector: 'img'
        });
    });
    </script>
**/
define( ['jQuery'], function (jQuery) {
    var VerticalSlideShow = function (args) {
        this.container = jQuery(args.container);
        this.container.css({
            overflow: 'auto',
            position: 'relative',
            width: '100%',
            height: '100%'
        });
        this.selector = args.selector || 'img';

        this.els = jQuery( args.container + ' '+ this.selector );
        for (var i=0; i<this.els.length; i++){
            this.els[i] = jQuery( this.els[i] );
        }

        this.direction = 0;
        this.scrollDuration = 300;
        this.delayAfter = 500;
        this.currentIndex = 0;
        this.lastViewTop = -1;
        this.ready = true;

        var self = this;
        this.container.on('scroll', function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.scrollContainer();
            return false;
        } );
    };

    VerticalSlideShow.prototype.scrollContainer = function() {
        if (this.ready == false){
            return;
        }
        this.ready = false;

        this.viewTop = this.container.scrollTop();
        this.viewBottom = this.viewTop + jQuery(window).height();
        this.direction = this.viewTop >= this.lastViewTop? 1 : -1;
        this.currentIndex += this.direction;

        console.log(this.direction)

        if (this.currentIndex >= 0 && this.currentIndex < this.els.length){
            // this.els[ this.currentIndex ][0].scrollIntoView();
            var self = this;
            self.container.animate(
                {
                    scrollTop: self.els[self.currentIndex].offset().top
                        // - self.container.offset().top
                        + this.container.scrollTop()
                },
                self.scrollDuration,
                function () {
                    self.lastViewTop = self.container.scrollTop();
                    setTimeout( function (){
                        self.ready = true
                    }, self.delayAfter );
                }
            );
        }

        else {
            this.currentIndex -= this.direction;
            this.ready = true;
        }
    };

    return VerticalSlideShow;
});



