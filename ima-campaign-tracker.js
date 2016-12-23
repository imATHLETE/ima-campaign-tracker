(function () {
    var $ima = window.$ima || {};
    window.$ima = $ima;
    if (!$ima.campaignTracker) {
        var init = function(){
            function getQueryParams(qs) {
                qs = qs.split('+').join(' ');

                var params = {},
                    tokens,
                    re = /[?&]?([^=]+)=([^&]*)/g;

                while (tokens = re.exec(qs)) {
                    params[decodeURIComponent(tokens[1]).toLowerCase()] = decodeURIComponent(tokens[2]);
                }

                return params;
            }

            function hasQueryParams(url) {
                return getQueryString(url).length > 1;
            }

            function getQueryString(url) {
                return url.split('?');
            }

            function setCookie(campaign, src){
                var browser = getBrowser().name.toLowerCase();
                if (browser === "msie" || browser === "ie")
                {
                    document.cookie = "emailCampaignTracker=" + JSON.stringify({campaign: campaign, src: src}) + "; path=/";
                } else {
                    document.cookie = "emailCampaignTracker=" + JSON.stringify({campaign: campaign, src: src}) + "; expires=0; path=/";
                }
            }

            function findLinks(campaign, src) {
                var href, params, qs, pattern,
                    links = document.getElementsByClassName('ima-reg-link');

                for (var i = 0, l = links.length; i < l; i++) {
                    href = links[i].getAttribute('href');
                   
                    if (href) {
                        qs = getQueryString(href);
                        if (qs.length > 1) {
                            params = getQueryParams(qs[1]);
                            if (params.campaign && params.src) {
                                pattern = "campaign=" + params.campaign;
                                qs[1] = qs[1].replace(pattern, "campaign=" + campaign);
                                pattern = "src=" + params.src;
                                qs[1] = qs[1].replace(pattern, "src=" + src);
                                href = qs[0] + "?" + qs[1];
                            } else {
                                href = href + "&campaign=" + campaign + "&src=" + src;
                            }
                        } else {
                            href = href + "?campaign=" + campaign + "&src=" + src;
                        }
                    }
                    links[i].setAttribute('href', href);
                }
            }

            function getBrowser() {
                var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return { name: 'IE', version: (tem[1] || '') };
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\bOPR|Edge\/(\d+)/)
                    if (tem != null) { return { name: 'Opera', version: tem[1] }; }
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
                return {
                    name: M[0],
                    version: M[1]
                };
            }

            function getCookie(name) {
                match = document.cookie.match(new RegExp(name + '=([^;]+)'));
                if (match) return match[1];
            }

            function bind() {
                var params = getQueryParams(document.location.search);

                if (params.campaign && params.src) {
                    setCookie(params.campaign, params.src);

                }

                var cookie = getCookie("emailCampaignTracker");

                if (cookie) {
                    cookie = JSON.parse(cookie);
                    findLinks(cookie.campaign, params.src);
                }
            }
            debugger;
            bind();

            $ima.campaignTracker = {
                bind: bind
            }

            return $ima.campaignTracker;
        }

        init();
    } else {
        $ima.campaignTracker.bind();
    }
})();

