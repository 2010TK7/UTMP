function strtotime(text, now) {
  // Convert string representation of date and time to a timestamp  
  // 
  // version: 1109.2015
  // discuss at: http://phpjs.org/functions/strtotime
  // +   original by: Caio Ariede (http://caioariede.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: David
  // +   improved by: Caio Ariede (http://caioariede.com)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Wagner B. Soares
  // +   bugfixed by: Artur Tchernychev
	  // +   bugfixed by: veda
  // +   improved by: A. Matías Quezada (http://amatiasq.com)
  // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
  // *     example 1: strtotime('+1 day', 1129633200);
  // *     returns 1: 1129719600
  // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
  // *     returns 2: 1130425202
  // *     example 3: strtotime('last month', 1129633200);
  // *     returns 3: 1127041200
  // *     example 4: strtotime('2009-05-04 08:30:00');
  // *     returns 4: 1241418600
  if (!text)
      return null;

  // Unecessary spaces
  //text = text.trim()IE do not support trim
  text = text.replace(/(^\s*)|(\s*$)/g,'')
      .replace(/\s{2,}/g, ' ')
      .replace(/[\t\r\n]/g, '')
      .toLowerCase();

  var parsed;

  if (text === 'now')
      return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
  else if (!isNaN(parse = Date.parse(text)))
      return parse / 1000 | 0;
  if (text == 'now')
      return new Date().getTime() / 1000; // Return seconds, not milli-seconds
  else if (!isNaN(parsed = Date.parse(text)))
      return parsed / 1000;

  var match = text.match(/^(\d{2,4})-(\d{2})-(\d{2})(?:\s(\d{1,2}):(\d{2})(?::\d{2})?)?(?:\.(\d+)?)?$/);
  if (match) {
      var year = match[1] >= 0 && match[1] <= 69 ? +match[1] + 2000 : match[1];
      return new Date(year, parseInt(match[2], 10) - 1, match[3],
          match[4] || 0, match[5] || 0, match[6] || 0, match[7] || 0) / 1000;
  }

  var date = now ? new Date(now * 1000) : new Date();
  var days = {
      'sun': 0,
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6
  };
  var ranges = {
      'yea': 'FullYear',
      'mon': 'Month',
      'day': 'Date',
      'hou': 'Hours',
      'min': 'Minutes',
      'sec': 'Seconds'
  };

  function lastNext(type, range, modifier) {
      var day = days[range];

      if (typeof(day) !== 'undefined') {
          var diff = day - date.getDay();

          if (diff === 0)
              diff = 7 * modifier;
          else if (diff > 0 && type === 'last')
              diff -= 7;
          else if (diff < 0 && type === 'next')
              diff += 7;

          date.setDate(date.getDate() + diff);
      }
  }
  function process(val) {
      var split = val.split(' ');
      var type = split[0];
      var range = split[1].substring(0, 3);
      var typeIsNumber = /\d+/.test(type);

      var ago = split[2] === 'ago';
      var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

      if (typeIsNumber)
          num *= parseInt(type, 10);

      if (ranges.hasOwnProperty(range))
          return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
      else if (range === 'wee')
          return date.setDate(date.getDate() + (num * 7));

      if (type === 'next' || type === 'last')
          lastNext(type, range, num);
      else if (!typeIsNumber)
          return false;

      return true;
  }

  var regex = '([+-]?\\d+\\s' +
      '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
      '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
      '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s' +
      '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
      '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
      '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?';

  match = text.match(new RegExp(regex, 'gi'));
  if (!match)
      return false;

  for (var i = 0, len = match.length; i < len; i++)
      if (!process(match[i]))
          return false;

  // ECMAScript 5 only
  //if (!match.every(process))
  // return false;

  return (date.getTime() / 1000);
}



function getdate (timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Paulo Freitas
  // +   input by: Alex
	  // +   input by: veda
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: getdate(1055901520);
  // *     returns 1: {'seconds': 40, 'minutes': 58, 'hours': 21, 'mday': 17, 'wday': 2, 'mon': 6, 'year': 2003, 'yday': 167, 'weekday': 'Tuesday', 'month': 'June', '0': 1055901520}
  var _w = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'];
  var _m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var d = ((typeof(timestamp) == 'undefined') ? new Date() : // Not provided
  (typeof(timestamp) == 'object') ? new Date(timestamp) : // Javascript Date()
  new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
  );
  var w = d.getDay();
  var m = d.getMonth();
  var y = d.getFullYear();
  var r = {};

  r.seconds = d.getSeconds();
  r.minutes = d.getMinutes();
  r.hours = d.getHours();
  r.mday = d.getDate();
  r.wday = w;
  r.mon = m + 1;
  r.fullMon=r.mon;
  if (r.mon < 10) { 
  r.fullMon = '0' + r.mon;
  }
  r.year = y;
  r.yday = Math.floor((d - (new Date(y, 0, 1))) / 86400000);
  r.weekday = _w[w] + 'day';
  r.month = _m[m];
  r['0'] = parseInt(d.getTime() / 1000, 10);

  return r;
}

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 * demo
 * var now = new Date();
 * (now.format("yyyy-mm-dd hh:mm:ss"));
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
