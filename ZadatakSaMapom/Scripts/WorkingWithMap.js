


//mymap = L.map('mapid').setView([44.787197, 20.4489216], 10);
//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(mymap);

//var click = new OpenLayers.Control.Click();
//mymap.addControl(click);

//click.activate();


//OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
//    defaultHandlerOptions: {
//        'single': true,
//        'double': false,
//        'pixelTolerance': 0,
//        'stopSingle': false,
//        'stopDouble': false
//    },

//    initialize: function (options) {
//        this.handlerOptions = OpenLayers.Util.extend(
//            {}, this.defaultHandlerOptions
//        );
//       OpenLayers.Control.prototype.initialize.apply(
//            this, arguments
//        );
//        this.handler = new OpenLayers.Handler.Click(
//            this, {
//                'click': this.trigger
//            }, this.handlerOptions
//        );
//    },

//    trigger: function (e) {
//        var lonlat = map.getLonLatFromPixel(e.xy);
//        lonlat1 = new OpenLayers.LonLat(lonlat.lon, lonlat.lat).transform(toProjection, fromProjection);
//        alert("Hello..." + lonlat1.lon + "  " + lonlat1.lat);

//    }

//});