// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];

var debug = false;
var gaID  = "NRGR83XCFZ";
var aryCookies = { 
  "ad_storage"        : "denied", 
  "analytics_storage" : "denied", 
  "linkedin_insight"  : "denied" 
};

//var domain = getDomainName(getDomain(window.location.href,true));
var domain = getDomain(window.location.href,true);

function gtag(){dataLayer.push(arguments);}

function set_cookie(name, value) {
  document.cookie = name +'='+ value +'; Path=/; domain=' + domain + ';';
}

function getCookie(c_name) {
    var c_value = document.cookie,
        c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) c_start = c_value.indexOf(c_name + "=");
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function getDomain(url, subdomain) {
  subdomain = subdomain || false;
  url = url.replace(/(https?:\/\/)?(www.)?/i, '');
  if (!subdomain) {
    url = url.split('.');
    url = url.slice(url.length - 2).join('.');
  }
  if (url.indexOf('/') !== -1) {
    return url.split('/')[0];
  }
  return url;
}

function getDomainName(hostName) {
  return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if(name != '__TAG_ASSISTANT') {
      document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + domain + ";";
    }
  }
}

function clearAndReload() {
  deleteAllCookies();
  location.reload();
}

if (getCookie("consentStatus") === "granted") {
  if(debug) { alert('Tracking is on'); }
  for (var key in aryCookies) {
    var cookiecheck = getCookie(key) === "granted" ? "granted" : "denied";
    aryCookies[key] = cookiecheck;
    if(debug) { alert(key + ': ' + aryCookies[key]); }
  }
  gtag('consent', 'update', aryCookies);
  dataLayer.push({
    'event': 'allow_consent'
  });
} else {
  if(getCookie("consentStatus") === "denied") {
    if(debug) { alert('Tracking is turned off'); }
  } else {
    if(debug) { alert('Tracking is not yet determined');}
  }
  for (var key in aryCookies) { aryCookies[key] = "denied"; }
  gtag('consent', 'default', aryCookies);
  dataLayer.push({ 'event': 'default_consent' });
} 

$(document).ready(function(){
  
  if (!getCookie('consentStatus')) {     
    $("#cookiePanel").slideDown("slow");

    $('#btnConsentGranted').click(function() {
      if(debug) { alert('You have agreed'); }
      $("#cookiePanel").slideUp("slow");
      set_cookie("consentStatus", "granted");
      for (var key in aryCookies) {
        aryCookies[key] = $("#opt_" + key).is(":checked") ? "granted" : "denied";
        set_cookie(key, aryCookies[key]);
        if(debug) { alert(key + ': ' + aryCookies[key]); }
      }
      gtag('consent', 'update', aryCookies);
      dataLayer.push({ 'event': 'update_consent' });
      location.reload();
    });

    $('#btnConsentDenied').click(function() {
      if(debug) { alert('You have denied consent'); }
      $("#cookiePanel").slideUp("slow");
      set_cookie("consentStatus", "denied");
      location.reload();
    });

    $('#detailToggle').click(function() {
      $("#detailPanel").toggle();
    });
  }
  
});
