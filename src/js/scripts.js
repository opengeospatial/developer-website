//
// Scripts
// 

const orgs = [
                ["https://www.ogc.org/blog/4543", "assets/img/logos/nrcan.svg"],
                ["https://www.data.gov.uk/dataset/f9f57f34-e919-4bab-a2c2-ed7545cf0c48/os-ngd-api-features", "assets/img/logos/os.svg"]
            ];

const apis = [
    ["assets/img/feat-full.jpg", "OGC API - Features", "Interface for feature data.", 
        "https://features.developer.ogc.org/", "https://github.com/opengeospatial/ogcapi-features", true],
    ["assets/img/tile-thumb.jpg", "OGC API - Tiles", "Interface for tiles of geospatial information (e.g.: vector data, maps or coverages).", 
    "#!", "https://github.com/opengeospatial/ogcapi-tiles", true],
    ["assets/img/sensorthings.jpg", "SensorThings API", "Interface for spatially enabled IoT devices, data and applications.", 
    "#!", "https://github.com/opengeospatial/sensorthings", false],
    ["assets/img/geovolumes-thumb.jpg", "3D GeoVolumes", "Interface for 3D geospatial data.", 
    "#!", "https://github.com/opengeospatial/ogcapi-3d-geovolumes", false],
];

visitedOrgs = [];
visitedApis = [];


$(document).ready(function(){

  shuffleOrgs($('#shuffleOrgs .row.align-items-center'), visitedOrgs);
  shuffleApis($('#shuffleApis .row'), visitedApis);
  //loadSwagger();

});

function copyToClipboard(button){

    var text = "curl -X 'GET' \
        'https://demo.pygeoapi.io/master/collections/lakes/items?limit=10&skipGeometry=false&offset=0' \
        -H 'accept: application/geo+json' ";

    navigator.clipboard.writeText(text);

    //console.log(button);
    button.className="btn btn-success";
    console.log("code copied to clipboard!")

    //setTimeout(resetButton(button), 30000000);
};

function resetButton(button){
    button.className="btn btn-light";
    console.log("resetted button!")
};

/*
function loadSwagger(){
     const ui = SwaggerUIBundle({
        url: "assets/openapi.json", //Location of Open API spec in the repo
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
    })
    window.ui = ui 
}
*/

function calcIndex(val, arr) {
    return Math.round(val * (arr.length-1) / 100)
}

function getIndex(visited, arr){
    idx=calcIndex(Math.floor(Math.random() * 100), arr)
    while (visited.includes(idx)){
    idx=calcIndex(Math.floor(Math.random() * 100), arr)
    }
    visited.push(idx);
    return idx;
}

function shuffleOrgs($rows, visited) {
    $rows.children().html(function(i) {
      idx=getIndex(visited, orgs);
      //console.log(idx)
      return `<a href="${orgs[idx][0]}"><img class="img-fluid img-brand d-block mx-auto" src="${orgs[idx][1]}" alt="..."/></a>`
    }).addClass('col-md-4.col-sm-6.my-4');
  }

  function shuffleApis($rows, visited) {
    $rows.children().html(function(i) {
      //console.log("comes here")
      idx=getIndex(visited, apis);
      //console.log(idx)
      return `<div class="team-member">` + 
      '<div class="ribbon-holder">' + ( apis[idx][5]==true?
      '<div class="ribbon ribbon-holder">Published</div>' +
      `<img class="mx-auto rounded-circle" src="${apis[idx][0]}" alt="..."/>` + 
      '</div>' : 
      `<img class="mx-auto rounded-circle" src="${apis[idx][0]}" alt="..."/>` ) +
      `<h4>${apis[idx][1]}</h4>` +
      `<p class="text-muted">${apis[idx][2]}</p><a class="btn btn-dark btn-social mx-2" href="${apis[idx][3]}" title="Website" target="_blank"><i class="fa fa-link"></i></a><a class="btn btn-dark btn-social mx-2" href="${apis[idx][4]}" title="GitHub repo" target="_blank"><i class="fab fa-github"></i></a>` +
      `</div>`
      
    }).addClass('col-lg-4');
  }


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
