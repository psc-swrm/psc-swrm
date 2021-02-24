google.charts.load('current', {'packages':['gauge']});
const options = {
	env: 'AutodeskProduction',
	getAccessToken: function(callback) {
		fetch('/api/auth/token')
		    .then((response) => response.json())
		    .then((json) => {
                const auth = json.access_token;
                callback(auth.access_token, auth.expires_in);
            });
	}
};

let mainViewer = null;

Autodesk.Viewing.Initializer(options, () => {
    mainViewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('viewer'));
    mainViewer.start();
    loadModel(DEMO_URN /* set by the server-side template engine */);
});

function loadModel(urn) {
    return new Promise(function(resolve, reject) {
        function onDocumentLoadSuccess(doc) {
            const node = doc.getRoot().getDefaultGeometry();
            mainViewer.loadDocumentNode(doc, node)
                .then(function () {
                    mainViewer.restoreState({"seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIwLTA5LTI5LTIxLTU3LTQ0LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0NSUDkwMCUyMFNpbXBsaWZpZWQlMjB2OS5mM2Q","objectSet":[{"id":[],"idType":"lmv","isolated":[],"hidden":[],"explodeScale":0}],"viewport":{"name":"","eye":[-51.45847176451325,41.39488550102684,69.64400916638708],"target":[-5.779433302984671,-2.207692000541286,-2.3304020619282113],"up":[0.24401455226589935,0.8902976410030967,-0.38448278076760933],"worldUpVector":[-2.702496961041956e-33,1,3.134846438475504e-17],"pivotPoint":[-0.0000019073486328125,0.00019788742065429688,-0.0000019073486328125],"distanceToOrbit":95.75006627262817,"aspectRatio":2.031842100946692,"projection":"orthographic","isOrthographic":true,"orthographicHeight":95.75006627262825},"renderOptions":{"environment":"Tranquility","ambientOcclusion":{"enabled":false,"radius":12,"intensity":1},"toneMap":{"method":1,"exposure":-1,"lightMultiplier":-1},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":true,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":true}},"cutplanes":[]})
                    initPerformanceTab(mainViewer);
                    // initMaintenanceTab(mainViewer);
                    // initProcurementTab(mainViewer);
                    initViewer(mainViewer);
                    resolve();
                })
                .catch(function (err) {
                    reject('Could not load viewable: ' + err);
                });
        }
        function onDocumentLoadFailure(err) {
            reject('Could not load document: ' + err);
        }
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

function initViewer(viewer) {
    viewer.setQualityLevel(/* ambient shadows */ false, /* antialiasing */ true);
    viewer.setGroundShadow(false);
    viewer.setGroundReflection(false);
    viewer.setGhosting(true);
    viewer.setEnvMapBackground(true);
    viewer.setLightPreset(5);
    viewer.setSelectionColor(new THREE.Color(0xEBB30B));
}

class RandomNumberGenerator {
    constructor(seed) {
        this.m = 0x80000000;
        this.a = 1103515245;
        this.c = 12345;
        this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }

    nextInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    nextFloat() {
        return this.nextInt() / (this.m - 1);
    }
}
