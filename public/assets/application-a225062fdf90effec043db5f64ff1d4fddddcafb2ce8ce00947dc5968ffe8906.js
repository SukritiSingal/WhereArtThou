/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/

if(typeof Muse=="undefined")window.Muse={};Muse.Assert={};Muse.Assert.fail=function(a){alert("MuseJSAssert: "+a)};Muse.Assert.assert=function(a,b){if(!a)throw Error(b);};$.extend($.browser,{SafariMobile:navigator.userAgent.toLowerCase().match(/iP(hone|ad|od)/i)});if(!Array.indexOf)Array.prototype.indexOf=function(a){for(var b=0;b<this.length;++b)if(this[b]==a)return b;return-1};Muse.Plugins={};Muse.Utils={};
Muse.Utils.getCssVendorPrefix=function(){if(!Muse.Utils.isDefined(Muse.Utils.getCssVendorPrefix.flag))Muse.Utils.getCssVendorPrefix.flag=/webkit/i.test(navigator.appVersion)?"-webkit":/firefox/i.test(navigator.userAgent)?"-moz":/trident/i.test(navigator.userAgent)?"-ms":"opera"in window?"-o":"";return Muse.Utils.getCssVendorPrefix.flag};Muse.Utils.wrapElement=function(a,b){a.parentNode.replaceChild(b,a);b.appendChild(a)};
Muse.Utils.firstChild=function(a,b){for(var c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];if(d.nodeType==1&&(!b||b.matches(d)))return d}return null};Muse.Utils.firstDescendant=function(a,b,c){for(var d=0;d<a.childNodes.length;d++){var f=a.childNodes[d];if(f.nodeType==1){if(!b||b.matches(f))return f;if(!c||!c.matches(f))if(f=Muse.Utils.firstDescendant(f,b,c))return f}}return null};
Muse.Utils.descendants=function(a,b,c,d){if(!d)d=[],d.forEach=function(a){for(var b=0;b<this.length;b++)if(a(this[b]))break},d.forEachTry=function(a){for(var b=0;b<this.length;b++)try{if(a(this[b]))break}catch(c){}};for(var f=0;f<a.childNodes.length;f++){var g=a.childNodes[f];g.nodeType==1&&((!b||b.matches(g))&&d.push(g),(!c||!c.matches(g))&&Muse.Utils.descendants(g,b,c,d))}return d};Muse.Utils.children=function(a,b){return Muse.Utils.descendants(a,b,Muse.Utils.Match.always)};Muse.Utils.Match={};
Muse.Utils.Match.ByClass=function(a){this.cl=a};Muse.Utils.Match.ByClass.prototype.matches=function(a){return $(a).hasClass(this.cl)};Muse.Utils.Match.ByNodeName=function(a){this.nm=a.toLowerCase()};Muse.Utils.Match.ByNodeName.prototype.matches=function(a){return this.nm==a.nodeName.toLowerCase()};Muse.Utils.Match.ByFixed=function(a){this.matchResult=a};Muse.Utils.Match.ByFixed.prototype.matches=function(){return this.matchResult};Muse.Utils.Match.byClass=function(a){return new Muse.Utils.Match.ByClass(a)};
Muse.Utils.Match.byNodeName=function(a){return new Muse.Utils.Match.ByNodeName(a)};Muse.Utils.Match.byFixed=function(a){return new Muse.Utils.Match.ByFixed(a)};Muse.Utils.Match.always=Muse.Utils.Match.byFixed(!0);Muse.Utils.Match.never=Muse.Utils.Match.byFixed(!1);Muse.Utils.moveChildren=function(a,b){for(;a.childNodes.length>0;)b.appendChild(a.childNodes[0])};Muse.Utils.copyChildren=function(a,b){for(var c=0;c<a.childNodes.length;c++)b.appendChild(a.childNodes[c].cloneNode(!0))};
Muse.Utils.copyChildrenBefore=function(a,b){for(var c=0;c<a.childNodes.length;c++)b.parentNode.insertBefore(a.childNodes[c].cloneNode(!0),b)};Muse.Utils.pixelRound=function(a){return Math.floor((a*100+0.5)/100)};Muse.Utils.getCurrentHTMLFileName=function(a){var b=document.location.href;b.charAt(b.length-1)=="/"?b="index":(b=b.substring(b.lastIndexOf("/")+1),b=b.indexOf("#")==0?"index":b.substring(0,b.lastIndexOf(".")));a&&(b+=".html");return b};
Muse.Utils.getPageStyleSheet=function(){for(var a=0;a<document.styleSheets.length;++a){var b=document.styleSheets[a],c=b.ownerNode?b.ownerNode:b.owningElement;if(c&&c.id=="pagesheet")return b}};Muse.Utils.getStyleSheetRuleById=function(a,b){var c="#"+b.toLowerCase();return Muse.Utils.anyStyleSheetRule(a,function(a){return a.toLowerCase()==c})};
Muse.Utils.anyStyleSheetRule=function(a,b){var c=!1,d;try{d=a.cssRules}catch(f){}if(!d)c=!0,d=a.rules;if(!d)return null;for(var g=0;g<d.length;++g){var j=d[g];if(Muse.Utils.isDefined(j.selectorText))if(c){if(b(j.selectorText))return j}else for(var h=j.selectorText.split(/\s*,\s*/),l=0;l<h.length;l++)if(b(h[l]))return j}return null};Muse.Utils.getRuleProperty=function(a,b){return a.style.getPropertyValue?a.style.getPropertyValue(b):a.style.getAttribute(b)};
Muse.Utils.setRuleProperty=function(a,b,c){a.style.setProperty?a.style.setProperty(b,c,""):a.style.setAttribute(b,c,0)};Muse.Utils.removeRuleProperty=function(a,b){a.style.removeProperty?a.style.removeProperty(b):a.style.removeAttribute(b,0)};
Muse.Utils.cloneStyleSheetRule=function(a){if(!Muse.Utils.isDefined(Muse.Utils.cloneStyleSheetRule.newNumber))Muse.Utils.cloneStyleSheetRule.newNumber=1;var b=Muse.Utils.getPageStyleSheet(a),c=Muse.Utils.getStyleSheetRuleById(b,a),d="c"+Muse.Utils.cloneStyleSheetRule.newNumber++,f="#"+d;b.insertRule?b.insertRule(c.cssText.replace("#"+a,f),b.cssRules.length):b.addRule(f,c.style.cssText);return d};
Muse.Utils.toCamelCase=function(a){for(var b=Muse.Utils.toCamelCase.exp;b.test(a);a=a.replace(b,RegExp.$1.toUpperCase()));return a};Muse.Utils.toCamelCase.exp=/-([a-z])/;Muse.Utils.getStyleValue=function(a,b){var c=a.style[Muse.Utils.toCamelCase(b)];c||(document.defaultView?c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b):a.currentStyle&&(c=a.currentStyle[Muse.Utils.toCamelCase(b)]));c&&c.match(/(\d+)px/)&&(c=parseInt(c.substring(0,c.length-2)));return c};
Muse.Utils.getCanvasDirection=function(a,b){var c=a.closest("*[data-rotate]"),c=c.length>0?parseFloat(c.data("rotate"))%360:0;return{dir:c>=0&&c<=45||c>=135&&c<=225||c>=315&&c<360?b:b==="horizontal"?"vertical":"horizontal",reverse:b==="horizontal"?c>=135&&c<=315:c>=45&&c<=225}};Muse.Utils.urlParam=function(a,b){var c=RegExp("[\\?&]"+b+"=([^&#]*)").exec(a);return c?c[1]:null};
Muse.Utils.processHyperlink=function(a){var b=a.href,c=$(window),a=$(a),d=a.attr("target");if(!d||d=="_self"){var f=b.lastIndexOf("/"),d=b.lastIndexOf("#"),g=a.attr("class").match(/anim_(\w+)/);if(g&&d>f){var a=c.data("scrollWrapper"),j=b.substring(d),d=Muse.Utils.getAnchorWithDestination(j).offset(),b=g[1],h=a||window,f=document.documentElement||document.body,g=(a?a.scrollHeight():f.scrollHeight)-c.height(),c=(a?a.scrollWidth():f.scrollWidth)-c.width(),l=Math.min(g,d.top+(a&&!a.isStandard()?a.scrollTop():
0)),k=Math.min(c,d.left+(a&&!a.isStandard()?a.scrollLeft():0)),c=function(){h.scrollTo(k,l);try{history.replaceState({})}catch(a){if(!jQuery.browser.msie||jQuery.browser.version>7)window.location.hash=j}};try{history.pushState({},null,j)}catch(i){}if(window.scrollTo||void 0!==a){var a=a||$(document),n=a.scrollLeft(),o=a.scrollTop(),p=n,q=o;$({scrollDistance:0}).animate({scrollDistance:1},{duration:1E3,easing:b,step:function(a){a!=0&&(q=a*(l-o),p=a*(k-n),h.scrollTo(n+p,o+q))},complete:c})}else $("html,body").animate({scrollTop:l,
scrollLeft:k},1E3,b,c);return!1}}(c=Muse.Utils.urlParam(b,"devicelock"))&&Muse.Utils.createCookie("devicelock",c,0);return!0};var actionStack=[];Muse.Utils.redirectCancelled=!1;Muse.Utils.redirectHyperlink=function(a){if(Muse.Utils.redirectCancelled)setTimeout(function(){Muse.Utils.redirectCancelled=!1},0);else if(actionStack=[],Muse.Utils.processHyperlink(a)&&!Muse.Utils.isIBE()){var b=$(a).attr("target");b||(b="_self");window.open(a.href,b)}};
Muse.Utils.redirectHyperlinkInNewTab=function(a,b){if(Muse.Utils.redirectCancelled)setTimeout(function(){Muse.Utils.redirectCancelled=!1},0);else{actionStack=[];thisWindow=window.self;var c=window.open(a);b?c.focus():thisWindow.focus()}};Muse.Utils.isMouseLeftClick=function(a){return a.which==1};Muse.Utils.isMouseMiddleClick=function(a){return a.which==2};Muse.Utils.isRedirectLinkKeyboardAction=function(a){return a.which==13};
Muse.Utils.addHyperlinkAnchor=function(a){a=$(a);a.bind("mousedown",function(a){(Muse.Utils.isMouseLeftClick(a)||Muse.Utils.isMouseMiddleClick(a))&&actionStack.push(this)});a.bind("mouseup keyup",function(a){if(Muse.Utils.isMouseLeftClick(a)&&actionStack.indexOf(this)!=-1)a.ctrlKey||a.metaKey?Muse.Utils.redirectHyperlinkInNewTab(this.href,a.shiftKey):Muse.Utils.redirectHyperlink(this);else if(Muse.Utils.isMouseMiddleClick(a)&&actionStack.indexOf(this)!=-1)if(jQuery.browser.webkit||!a.target.href&&
jQuery.browser.msie)Muse.Utils.redirectHyperlinkInNewTab(this.href,a.shiftKey);else return actionStack=[],!0;else Muse.Utils.isRedirectLinkKeyboardAction(a)&&Muse.Utils.redirectHyperlink(this);return!1});Muse.Utils.isIBE()||a.bind("click",function(){return!1})};
Muse.Utils.addHyperlinkBlock=function(a){var b=$(a.parentNode);b.bind("mousedown",function(a){(Muse.Utils.isMouseLeftClick(a)||Muse.Utils.isMouseMiddleClick(a))&&actionStack.push(this);return!1});b.bind("mouseup keyup",function(b){Muse.Utils.isMouseLeftClick(b)&&actionStack.indexOf(this)!=-1?b.ctrlKey||b.metaKey?Muse.Utils.redirectHyperlinkInNewTab(a.href,b.shiftKey):Muse.Utils.redirectHyperlink(a):Muse.Utils.isMouseMiddleClick(b)&&actionStack.indexOf(this)!=-1?Muse.Utils.redirectHyperlinkInNewTab(a.href,
b.shiftKey):Muse.Utils.isRedirectLinkKeyboardAction(b)&&Muse.Utils.redirectHyperlink(a);return!1});Muse.Utils.isIBE()||b.bind("click",function(){return!1})};
Muse.Utils.prepHyperlinks=function(a){$("a.block").each(function(){var a=$(this.parentNode);Muse.Utils.addHyperlinkBlock(this);a.find("a.nonblock").each(function(){var a=$(this);if(a.data("registeredNonBlockLink")===!0)return!1;Muse.Utils.addHyperlinkAnchor(this);a.data("registeredNonBlockLink",!0)})});$("a.nonblock").each(function(){var a=$(this);a.data("registeredNonBlockLink")!==!0&&(a.parent('[class~="sbg"]').length>0?Muse.Utils.addHyperlinkAnchor(this):(a.attr("class").match(/anim_(\w+)/)||this.href.indexOf("devicelock=")!=
-1)&&$(this).bind("click",function(){return Muse.Utils.processHyperlink(this)}))});a&&Muse.Utils.enableAnchorLinksActiveState()};Muse.Utils.pathOnly=function(a){if(!a)return a;return a.replace(/#(?:[^#]+)$/,"").replace(/\?(?:[^\?]+)$/,"")};
Muse.Utils.enableAnchorLinksActiveState=function(){var a=$("#page"),b=a.outerWidth()/a.outerHeight()>2,c=[],a=$(window),d=Muse.Utils.getPageStyleSheet(),f=function(a){var b=a.parent('[class~="sbg"]');if(a.hasClass("MenuItem")||b.hasClass("MenuItem"))return"MuseMenuActive";if(a.hasClass("Button")||b.hasClass("Button"))return"ButtonSelected";return"MuseLinkActive"},g=function(){c.splice(0,c.length);$("a.nonblock,a.block").each(function(){Muse.Utils.saveHyperlinkInfo($(this),f($(this)),d,b,c)});c.sort(function(a,
b){if(a.from<b.from)return-1;if(a.from>b.from)return 1;return 0})};g();if(0!=c.length){var j=!1,h=a.data("scrollWrapper"),l=h||a,k=function(){j=!1;var a=b?l.scrollLeft():l.scrollTop(),d;a:{var k=0;d=c.length;for(var i;k<d;k++)if(i=c[k],i.from<=a&&a<=i.to){d=k;break a}d=-1}var m,s,k=Math.max(0,d);for(d=Math.min(d+2,c.length);k<d;k++)if(m=c[k],i=m.$elem.offset().left+(h&&!h.isStandard()?h.scrollLeft():0),s=m.$elem.offset().top+(h&&!h.isStandard()?h.scrollTop():0),m.from!=(b?i:s)){g();break}k=0;for(d=
c.length;k<d;k++){m=c[k];i=m.from<=a&&a<=m.to;m=m.hyperLinks;s=void 0;for(var v=0;v<m.length;v++)s=f(m[v]),i&&!m[v].hasClass(s)?m[v].addClass(s):!i&&m[v].hasClass(s)&&m[v].removeClass(s)}},i=function(){j||(j=!0,Muse.Utils.requestAnimationFrame(k))};(h=a.data("scrollWrapper"))?h.registerUpdateCallback(i):a.scroll(i);k()}};Muse.Utils.getAnchorWithDestination=function(a){if(!a||!a.replace)return $(a);return $(a.replace(/([\.\:])/gi,"\\$1"))};
Muse.Utils.saveHyperlinkInfo=function(a,b,c,d,f){var g=a.attr("href"),j=Muse.Utils.pathOnly(g),h=-1,l=a.attr("target"),k=window.location.href.replace(/#.*$/i,"");if(g&&-1!=g.indexOf("#")&&!(l&&l!="_self")&&!(0<=j.indexOf("/"))&&(k.charAt(k.length-1)=="/"&&(k+="index.html"),-1!=k.indexOf("/"+j,k.length-j.length-1))){var j=$(window).data("scrollWrapper"),i=g.substring(g.lastIndexOf("#")),a=a.parent('[class~="sbg"]').length>0||a.hasClass("block")?a.parent():a,n="#"+a.attr("id"),b="."+b;if(null!==Muse.Utils.anyStyleSheetRule(c,
function(a){return 0<=a.indexOf(n+b)||0<=a.indexOf(b+n)})){l=0;for(k=f.length;l<k;l++)if(f[l].href==g){h=l;break}if(-1==h){c=Muse.Utils.getAnchorWithDestination(i);if(c.length===0)return;l=j&&!j.isStandard();d=Math.floor(d?c.offset().left+(l?j.scrollLeft():0):c.offset().top+(l?j.scrollTop():0));j=Number.MAX_VALUE;l=0;for(k=f.length;l<k;l++)if(f[l].href!=g&&f[l].from==d){h=l;break}if(-1==h){l=0;for(k=f.length;l<k;l++){h=f[l];if(h.from<d&&d<h.to){j=h.to;h.to=d-1;break}h.from<=j&&(j=h.from-1)}f.push({hyperLinks:[],
from:d,to:j,$elem:c,href:g});h=f.length-1}}f[h].hyperLinks.push(a)}}};Muse.Utils.isIBE=function(){return Muse.Utils.readCookie("inbrowserediting")=="true"};
Muse.Utils.getNaturalWidth=function(a){var b=-1;a.naturalWidth!=null?b=a.naturalWidth:a.runtimeStyle?(a.runtimeStyle.width="auto",a.runtimeStyle.height="auto",a.runtimeStyle.borderWidth="0",a.runtimeStyle.padding="0",b=a.offsetWidth,a.runtimeStyle.width="",a.runtimeStyle.height="",a.runtimeStyle.borderWidth="",a.runtimeStyle.padding=""):(a=a.cloneNode(!0),a.className="",a.style.width="auto !important",a.style.height="auto !important",a.style.borderWidth="0 !important",a.style.padding="0 !important",
b=a.width);return b};
Muse.Utils.getNaturalHeight=function(a){var b=-1;a.naturalHeight!=null?b=a.naturalHeight:a.runtimeStyle?(a.runtimeStyle.width="auto",a.runtimeStyle.height="auto",a.runtimeStyle.borderWidth="0",a.runtimeStyle.padding="0",b=a.offsetHeight,a.runtimeStyle.width="",a.runtimeStyle.height="",a.runtimeStyle.borderWidth="",a.runtimeStyle.padding=""):(a=a.cloneNode(!0),a.className="",a.style.width="auto !important",a.style.height="auto !important",a.style.borderWidth="0 !important",a.style.padding="0 !important",
b=a.height);return b};Muse.Utils.pieLoading=!1;Muse.Utils.pieFunctionQueue=[];
Muse.Utils.needPIE=function(a){if(Muse.Utils.havePIE)a();else if(Muse.Utils.pieFunctionQueue.push(a),!Muse.Utils.pieLoading)Muse.Utils.pieLoading=!0,a="scripts/pie.js",a[0]=="/"&&(a=location.pathname.indexOf(".html")!=-1?location.pathname.substring(0,location.pathname.lastIndexOf("/"))+a:location.pathname+a,a=a.replace(/\/+/g,"/")),$.ajax({url:a,dataType:"script",complete:function(){if(Muse.Utils.isDefined(window.PIE)){Muse.Utils.havePIE=!0;Muse.Utils.pieLoading=!1;for(var a=0;a<Muse.Utils.pieFunctionQueue.length;++a)Muse.Utils.pieFunctionQueue[a]()}}})};
Muse.Utils.transformMarkupToFixBrowserProblemsPreInit=function(){jQuery.browser.msie?(jQuery("html").addClass("ie"),jQuery.browser.version<8&&Muse.Utils.changeLItoDIVs(),jQuery.browser.version<=8&&Muse.Utils.monitorCheckboxes()):jQuery.browser.SafariMobile&&jQuery("body").css("-webkit-text-size-adjust","none")};Muse.Utils.monitorCheckboxes=function(){var a=function(a){"checked"==a.attr("checked")?a.removeClass("not_checked").addClass("checked"):a.removeClass("checked").addClass("not_checked")};$(".fld-checkbox input[type=checkbox]").each(function(){a($(this))}).click(function(){a($(this))})};
Muse.Utils.transformMarkupToFixBrowserProblems=function(){Muse.Utils.havePIE=!1;jQuery.browser.msie&&jQuery.browser.version<=9&&(jQuery.browser.version<=9&&(Muse.Utils.addGradientFill(),Muse.Utils.addShadows()),jQuery.browser.version<9&&(Muse.Utils.applyIEFilterToPNGImages(),Muse.Utils.addRoundedCorners(),Muse.Utils.addRGBA(),Muse.Utils.removeEdgeAnimationBorderForIE78()),jQuery.browser.version<8&&Muse.Utils.fixWidthsForClearingInIE7());(jQuery.browser.msie&&jQuery.browser.version<9||jQuery.browser.webkit)&&
Muse.Utils.insertEmptyDivAfterPinnedColumnElements();Muse.Utils.fixTransformRotations();Muse.Utils.fixImageFramesWithRoundedCorners();Muse.Utils.fixSVGImages();var a=$(window).data("musePolyfill.bgSize");null!=a&&a.initialize($(".museBGSize"))};Muse.Utils.fixSVGImages=function(){var a=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),b=$("html");a||(b.addClass("nosvg"),$("body img").each(function(){var a=$(this),b=a.data("mu-svgfallback");b&&a.attr("src",b)}))};
Muse.Utils.applyIEFilterToPNGImages=function(){jQuery.browser.msie&&jQuery.browser.version<9&&$("body *").not(".museBgSizePolyfill img,.f3s_top,.f3s_mid,.f3s_bot").each(function(){var a=$(this);if(!a.data("mu-ie-matrix")&&(a.css("background-image").match(/\b.png/i)||this.nodeName&&this.nodeName.toLowerCase()=="img"&&a.attr("src").match(/\b.png/i))){var b=a.css("filter");a.css("filter",b?b+" progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)":"progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)")}})};
Muse.Utils.insertEmptyDivAfterPinnedColumnElements=function(){$(".pinned-colelem").each(function(){$("<div class='colelem'/>").insertAfter($(this))})};Muse.Utils.fixPNGImages=function(){$("body *").each(function(){var a=this,b=$(a);(b.css("background-image").match(/\b.png/i)||a.nodeName&&a.nodeName.toLowerCase()=="img"&&b.attr("src").match(/\b.png/i))&&Muse.Utils.needPIE(function(){b.css("-pie-png-fix","true");PIE.attach(a)})})};
Muse.Utils.addGradientFill=function(){$(".gradient").each(function(){var a=this;Muse.Utils.needPIE(function(){PIE.attach(a)})})};Muse.Utils.addShadows=function(){$(".shadow").each(function(){var a=this,b=$(a);Muse.Utils.needPIE(function(){b.data("mu-ie-matrix")||PIE.attach(a)})})};
Muse.Utils.fixImageFramesWithRoundedCorners=function(){Muse.Browser.Features.checkCSSFeature("border-radius")&&Muse.Browser.Features.checkCSSFeature("-webkit-border-radius")&&$(".rounded-corners").each(function(){if($(this).hasClass("clip_frame")){var a=Muse.Utils.firstDescendant(this,Muse.Utils.Match.byNodeName("img"));a&&$(a).wrap('<div class="clip_frame"></div>')}})};
Muse.Utils.addRoundedCorners=function(){$(".rounded-corners").each(function(){var a=this;Muse.Utils.needPIE(function(){var b=$(a);if(!b.data("mu-ie-matrix")){var c=b.css("filter");if(!c||!(c.toLowerCase().indexOf("opacity")>0&&c.indexOf("=100")<0)){if(a.childNodes.length&&!Muse.Browser.Features.checkCSSFeature("border-radius")&&(c=Muse.Utils.firstChild(a))&&c.nodeName.toLowerCase()=="img"){var c=$(c),d=c.attr("src"),f=b.css("background-color")+" ",g=c.css("margin-left");if(g=="0px"||g=="auto")g=c.css("padding-left");
var j=c.css("margin-top");if(j=="0px"||j=="auto")j=c.css("padding-top");c.css("visibility","hidden");b.css("background",f+"url("+d+") no-repeat "+g+" "+j)}if(jQuery.browser.msie&&jQuery.browser.version<8&&(b.css("border-left-width")==0||b.css("border-left-style")=="none")&&(b.css("border-right-width")==0||b.css("border-right-style")=="none")&&(b.css("border-top-width")==0||b.css("border-top-style")=="none")&&(b.css("border-bottom-width")==0||b.css("border-bottom-style")=="none"))b.css({"border-right-width":"1px",
"border-right-style":"solid","border-right-color":b.css("background-color")}),b.width(b.width()-1);PIE.attach(a)}}})})};Muse.Utils.addRGBA=function(){$(".rgba-background").each(function(){var a=this;Muse.Utils.needPIE(function(){PIE.attach(a)})})};Muse.Utils.resizeHeight=function(){$(".browser_width").each(function(){var a=$(this),b=a;a.parent().hasClass("sbg")&&(b=a.parent());a=$(a.children()[0]);a.css("position")!="fixed"&&(b.height(a.outerHeight()),a.watch("height",function(){b.height($(this).outerHeight())}))})};
Muse.Utils.fixWidthsForClearingInIE7=function(){$(".colelem").each(function(){var a=$(this).offset().left-$(this).parent().offset().left;if($(this).width()<1||$(this).width()+a<1)$(this).css("width",(a<0?1-a:1)+"px")})};Muse.Utils.removeEdgeAnimationBorderForIE78=function(){$(".animationContainer").each(function(){$(this).parent().html(function(a,b){return b.replace(/><\/iframe>$/gi,' frameBorder="0"></iframe>')})})};
Muse.Utils.initializeAnimations=function(a){var b=function(b){if(!0===a){var d=b.contents();$("#report-abuse",d).remove();$("#report-abuse-spacer",d).remove()}b.removeClass("an_invi")};$(".animationContainer").each(function(){var a=$(this);Muse.Utils.isIBE()||this.contentDocument&&"complete"==this.contentDocument.readyState?b(a):a.load(function(){b(a)})})};
Muse.Utils.fixTransformRotations=function(){Muse.Browser.Features.checkCSSFeature("transform")||$("*[data-mu-ie-matrix]").each(function(){var a=$(this),b=a.parent(),c=Math.round(a.data("mu-ie-matrix-dx")),d=Math.round(a.data("mu-ie-matrix-dy")),f=b.innerHeight(),g=b.innerWidth();a.css({filter:function(b,c){if(c)return c+" "+a.data("mu-ie-matrix");return a.data("mu-ie-matrix")},"margin-bottom":"-="+d}).removeClass("shadow");b.css({"margin-bottom":"-="+(b.innerHeight()-f),"margin-right":"-="+(b.innerWidth()-
g)});a.hasClass("actAsDiv")?(a.wrap('<span class="actAsDiv rotateWrapper"></span>'),a.parent().css("float",a.css("float"))):a.hasClass("actAsInlineDiv")?a.wrap('<span class="actAsInlineDiv rotateWrapper"></span>'):a.wrap('<div class="rotateWrapper"></div>');a.parent().css({top:d,left:c,position:"relative","margin-bottom":d})})};Muse.Utils.fullPage=function(a){$(window).data("stickyFooter").init(a)};
Muse.Utils.endsWith=function(a,b){if(!a||!b)return!1;Muse.Assert.assert("string"==typeof a,'Invalid type for "str" argument - expected string.');Muse.Assert.assert("string"==typeof b,'Invalid type for "ending" argument - expected string.');return a.substring(a.length-b.length)==b};Muse.Utils.firstDefined=function(){for(var a=0;a<arguments.length;a++)if(Muse.Utils.isDefined(arguments[a]))return arguments[a]};Muse.Utils.isDefined=function(a){return"undefined"!=typeof a};
Muse.Utils.getCSSIntValue=function(a,b){return Muse.Utils.tryParse(a.css(b),parseInt,0)};Muse.Utils.tryParse=function(a,b,c){if(!Muse.Utils.isDefined(a))return c;a=b(a);return!isNaN(a)?a:c};Muse.Utils.changeLItoDIVs=function(){var a=function(){var a=$(this),c=$("<div/>");c.addClass(a.attr("class"));c.attr("id",a.attr("id"));c.append(a.contents());a.replaceWith(c)};$("ul").each(function(){$(this).find("li").each(a)});$("ul").each(a)};Muse.Utils.initWidget=function(a,b){$(a).each(function(){b(this)})};
Muse.Utils.showWidgetsWhenReady=function(){jQuery(".disn").removeClass("disn");jQuery(".invi").removeClass("invi");jQuery(".widget_invisible").removeClass("widget_invisible")};
Muse.Utils.detachIframesAndObjectsToPauseMedia=function(a){var b=[],c=[];$("iframe, object",a).each(function(){var a=$(this);if(!a.is("object")||!(jQuery.browser.msie&&jQuery.browser.version<9)){if(a.is("iframe")){var f=a.prop("src");if(""==f||!f||!f.indexOf)return;if(0<=f.indexOf("vimeo.com")){Muse.Utils.VimeoVideoHelper.pause(a);c.push({$node:a,playFn:function(a){Muse.Utils.VimeoVideoHelper.seekTo(a,0);Muse.Utils.VimeoVideoHelper.isAutoPlay(a)&&Muse.Utils.VimeoVideoHelper.play(a)}});return}}f={};
f.$next=a.next();f.$parent=a.parent();jQuery.browser.msie?(f.html=a.wrap('<div id="deleteMeWrapper"/>').parent().html(),a.remove(),f.$parent.children("div #deleteMeWrapper").remove()):(f.$node=a.clone(),a.remove());b.push(f)}});b.length&&a.data("detached",b);c.length&&a.data("paused",c);$("video",a).each(function(){if(jQuery.browser.msie&&jQuery.browser.version==9&&this.pause&&this.getAttribute("autoplay")&&this.readyState!=4)$(this).one("play",function(){this.pause()});else this.pause&&!this.paused&&
this.pause()})};
Muse.Utils.attachIframesAndObjectsToResumeMedia=function(a){var b=a.data("detached");if(b){for(var c=b.length-1;c>=0;c--){var d=b[c];!d.$next||d.$next.length==0?d.$parent.append(d.$node?d.$node:d.html):d.$next.before(d.$node?d.$node:d.html);d.$next=d.$parent=d.$node=d.html=void 0}a.data("detached",null)}if(b=a.data("paused"))for(c=0;c<b.length;c++)d=b[c],d.playFn(d.$node);$("iframe",a).each(function(){var a=$(this),b=a.attr("src"),c=a.data("src");"about:blank"==b&&c&&a.attr("src",c)});$("video",a).each(function(){if(this.play&&
this.getAttribute("autoplay")&&this.paused)this.currentTime=0,this.play()})};
Muse.Utils.VimeoVideoHelper=function(a){var b=[],c=function(a,b){if(!0==a.data("isReady"))b();else{var c=a.data("readyQueue");c||(c=[]);c.push(b);a.data("readyQueue",c)}},d=function(a,c,d,g){var f=a[0].contentWindow;g&&b.push({source:f,method:c,callbackFn:g});c='"method": "'+c+'"';"undefined"!=typeof d&&null!==d&&(c+='"value":"'+d+'"');a=a.attr("src").split("?")[0];a.match(/^\w+\:\/\//gi)||(a=document.location.protocol+a);f.postMessage("{"+c+"}",a)},f=function(b){data=null;JSON&&JSON.parse&&(data=
JSON.parse(b.data));var c=null;data&&data.player_id&&(c=a("#"+data.player_id));(!c||!c.length)&&a("iframe").each(function(){if(this.contentWindow==b.source)return c=a(this),!1});return c},g=function(a){var c=JSON.parse(a.data);if(c){if("ready"==c.event){var d=f(a);d.data("isReady",!0);var g=d.data("readyQueue");if(g&&g.length)for(var i=0;i<g.length;i++)g[i]();d.data("readyQueue",null)}for(i=0;i<b.length;)d=b[i],d.source==a.source&&d.method==c.method?(d.callbackFn(c.value),b.splice(i,1)):i++}};window.addEventListener?
window.addEventListener("message",g,!1):window.attachEvent("onmessage",g,!1);g=function(){};g.prototype.play=function(a){c(a,function(){d(a,"play")})};g.prototype.pause=function(a){c(a,function(){d(a,"pause")})};g.prototype.isPaused=function(a,b){c(a,function(){d(a,"paused",null,b)})};g.prototype.seekTo=function(a,b){c(a,function(){d(a,"seekTo",b)})};g.prototype.isAutoPlay=function(a){a=a.attr("src").split("?");a.shift();for(var a=a.join("?").split("&"),b=0;b<a.length;b++)if(a[b].match(/autoplay\s*=\s*1/gi))return!0;
return!1};return new g}(jQuery);
(function(a){a(window);var b=a("html"),c=["src"],d=["hidpi-src","src"],f=a(".hidpi_button"),g=function(){this._mode="standard"};g.swapSources=function(a,b,c){var d=a.data(b);d&&!("src"==b&&a.hasClass("ImageInclude")&&"images/blank.gif"==a.attr("src")&&a.parents(".SlideShowWidget").length)&&("src"==c&&!a.data(c)&&a.data(c,a.attr("src")),a.attr("src",d))};g.isRetina=function(){if(1.5<=window.devicePixelRatio)return!0;if(window.matchMedia&&window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)").matches)return!0;return!1}();
g.shouldUseCookie=0<f.length;g.getResolutionPreference=function(){return Muse.Utils.readCookie("museresolution")};g.saveResolutionPreference=function(a){Muse.Utils.createCookie("museresolution",a)};g.prototype.initializeHiDPIButton=function(){if(g.isRetina){var a=this;f.removeClass("unavailable").click(function(){switch(a._mode){case "standard":a.hidpiMode();break;case "hidpi":a.standardMode();break;default:Muse.Assert.assert(!1,"Unknown mode: "+a._mode)}})}};g.prototype.activate=function(){this.initializeHiDPIButton();
g.isRetina&&(!g.shouldUseCookie||"hidpi"==g.getResolutionPreference())?this.hidpiMode():this.standardMode()};g.prototype.getCurrentMode=function(){return this._mode};g.prototype.setCurrentMode=function(a){this._mode=a;if(g.isRetina){switch(a){case "standard":f.removeClass("on").addClass("off");break;case "hidpi":f.removeClass("off").addClass("on");break;default:Muse.Assert.assert(!1,"Unknown mode: "+a)}g.shouldUseCookie&&g.saveResolutionPreference(a)}};g.prototype.standardMode=function(){this.setCurrentMode("standard");
b.removeClass("hidpi");a("img").each(function(){g.swapSources(a(this),"src","hidpi-src")})};g.prototype.hidpiMode=function(){this.setCurrentMode("hidpi");b.addClass("hidpi");a("img").each(function(){g.swapSources(a(this),"hidpi-src","src")})};g.prototype.getDataSrcAttrName=function(){return"standard"==this._mode?c:d};a(window).data("ResolutionManager",new g)})(jQuery);Muse.Utils.detectScreenResolution=function(){$(window).data("ResolutionManager").activate()};
Muse.Utils.createCookie=function(a,b,c){if(c){var d=new Date;d.setTime(d.getTime()+c*864E5);c="; expires="+d.toGMTString()}else c="";document.cookie=a+"="+b+c+"; path=/"};Muse.Utils.readCookie=function(a){a+="=";for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)==0)return d.substring(a.length,d.length)}return null};Muse.Utils.eraseCookie=function(a){createCookie(a,"",-1)};Muse.Browser={};
Muse.Browser.domPrefixes=["Webkit","Moz","O","ms","Khtml"];Muse.Browser.Features={};
Muse.Browser.Features.Touch=function(){if(navigator.maxTouchPoints>0)return{Start:"pointerDown",End:"pointerUp",Move:"pointerMove",Listener:function(a){return function(b){var c=b.originalEvent||b;if(c.pointerType!=c.POINTER_TYPE_MOUSE)return a.apply(this,arguments)}}};else for(var a=0,b=Muse.Browser.domPrefixes.length;a<b;a++){var c=Muse.Browser.domPrefixes[a];if(c+"MaxTouchPoints"in navigator&&navigator[c+"MaxTouchPoints"])return c=c.toUpperCase(),{Start:c+"PointerDown",End:c+"PointerUp",Move:c+
"PointerMove",Listener:function(a){return function(b){var d=b.originalEvent||b;if(d.pointerType!=d[c+"POINTER_TYPE_MOUSE"])return a.apply(this,arguments)}}}}try{return document.createEvent("TouchEvent"),{Start:"touchstart",End:"touchend",Move:"touchmove",Listener:function(a){return a}}}catch(d){}return!1}();
Muse.Browser.Features.checkCSSFeature=function(a,b){var c=Muse.Utils.toCamelCase(a),b=b||document.createElement("div");if(c in b.style)return!0;for(var c=c.charAt(0).toUpperCase()+c.substr(1),d=0,f=Muse.Browser.domPrefixes.length;d<f;d++)if(Muse.Browser.domPrefixes[d]+c in b.style)return Muse.Browser.domPrefixes[d];return!1};
Muse.Browser.Features.checkCSSValueCompatibility=function(a,b){var c=document.createElement("div"),a=Muse.Utils.toCamelCase(a),d=Muse.Browser.Features.checkCSSFeature(a,c);if(d)d!==!0&&(a=d+a.charAt(0).toUpperCase()+a.substr(1));else return!1;d=c.style[a];c.style[a]=b;if(c.style[a]!==d||b===d)return!0;for(var f=0;f<Muse.Browser.domPrefixes.length;f++){var g="-"+Muse.Browser.domPrefixes[f].toLowerCase()+"-"+b;c.style[a]=g;if(c.style[a]!==d)return Muse.Browser.domPrefixes[f]}return!1};
Muse.Browser.Bugs={};
Muse.Browser.Bugs.ClearNeedsOuterWidth=function(){var a=document.createElement("div");a.id="mbbcnow00";a.innerHTML='<div>a</div><style type="text/css">#mbbcnow00{position:absolute;top:-9999px;left:-9999px;visibility:hidden;} #mbbcnow01{width:1px;margin-right:-9999px;float:left} #mbbcnow02{clear:left;}</style>';var b=document.createElement("div"),c=document.createElement("div");document.body.appendChild(a);a.appendChild(b);a.appendChild(c);b.innerHTML="a";b.id="mbbcnow01";c.innerHTML="b";c.id="mbbcnow02";
b=c.getBoundingClientRect().top-b.getBoundingClientRect().top;document.body.removeChild(a);return b<1}();Muse.Browser.Bugs.CannotHandleClearBoth=function(){return jQuery.browser.msie&&7==jQuery.browser.version}();
Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder=function(){var a=!1,b=$("<div>").css({border:"1px solid #000000;",width:100,height:100,position:"absolute",top:-99999,left:-99999,padding:0,margin:0,overflow:"auto"}).appendTo(document.body)[0];b.scrollHeight!==b.clientHeight&&(a=!0);$(b).remove();return a}();
(function(a){var b=a(window),c=a("body"),d=function(){this.pendingRequest=void 0;this.enabled=!0};d.prototype.init=function(d){this.$spacer=a(d+" .verticalspacer");this.$page=a(d);this.spacerMinHeight=1;this.$spacer.css("min-height",this.spacerMinHeight);this.$spacer.height()<this.spacerMinHeight&&this.$spacer.height(Math.floor(this.spacerMinHeight+1));this.spacerHeight=this.$spacer.height();this.pageMarginTop=Muse.Utils.getCSSIntValue(c,"padding-top")+Muse.Utils.getCSSIntValue(c,"margin-top");this.pageMarginBottom=
Muse.Utils.getCSSIntValue(c,"padding-bottom")+Muse.Utils.getCSSIntValue(c,"margin-bottom");this.pageResizeWatchEnabled=!0;this.alwaysVertScroll=c.hasClass("always_vert_scroll");this.updateSpacerMargin=0!=Muse.Utils.getCSSIntValue(this.$spacer,"margin-bottom");var g=this;if(Muse.Browser.Bugs.CannotHandleClearBoth&&0!=Muse.Utils.getCSSIntValue(this.$spacer,"margin-bottom"))this.$spacer.css("margin-bottom",0),this.updateSpacerMargin=!1;this.calculateInitialSpacerHeight();this.$page.watch("height",function(){g.onPageHeightChanged()});
b.resize(function(){g.doUpdate()});this.initialized=!0;this.doUpdate(this.pendingRequest)};d.prototype.updateScrollClass=function(a){var a=this.spacerMinHeight<Math.floor(a*100)/100,b=!1;this.alwaysVertScroll||(a&&!c.hasClass("no_vert_scroll")?(c.addClass("no_vert_scroll"),b=!0):!a&&c.hasClass("no_vert_scroll")&&(c.removeClass("no_vert_scroll"),b=!0));b&&this.$spacer.css("height")};d.prototype.doUpdate=function(a){if(this.enabled)if(this.initialized){parseInt(a)||(a=0);this.updateSpacerMargin&&this.$spacer.css("margin-bottom",
-(this.$spacer.offset().top-this.pageMarginTop));var c=this.$page.outerHeight(!0),d=c-this.spacerHeight,a=Math.max(this.spacerMinHeight,b.height()-this.pageMarginTop-this.pageMarginBottom-d-a);if(a!=this.spacerHeight){this.pageResizeWatchEnabled=!1;this.updateScrollClass(a);this.$spacer.css("height",a);if(a<this.spacerHeight&&c==this.$page.outerHeight(!0))a=this.spacerHeight,this.updateScrollClass(a),this.$spacer.css("height",a);this.pageResizeWatchEnabled=!0}return this.spacerHeight=a}else this.pendingRequest=
a};d.prototype.calculateInitialSpacerHeight=function(){for(var a=0,b=0;b++<20;){var c=this.doUpdate();if(c<=a)break;a=c}};d.prototype.onPageHeightChanged=function(a){this.pageResizeWatchEnabled&&this.doUpdate(a)};d.prototype.enable=function(){this.enabled=!0};d.prototype.disable=function(){this.enabled=!1};b.data("stickyFooter",new d("#page"))})(jQuery);
Muse.Utils.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame&&window.webkitRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame&&window.mozRequestAnimationFrame.bind(window)||window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||function(a){window.setTimeout(a,20)}}();
Muse.Utils.animationFrameFx=function(a,b){var c=a.fx;a.extend(c,a.fx);var d,f=a(b).data("stickyFooter"),g=function(){d&&(Muse.Utils.requestAnimationFrame(g),c.tick(),f.doUpdate())};c.timer=function(b){b()&&a.timers.push(b)&&!d&&(d=!0,g())};c.stop=function(){d=!1};a.fn.animationFrameFx=c}(jQuery,this);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"museutils.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("museutils.js");break}}}}})();
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on("pageshow.rails", function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data("ujs:enable-with")) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref, _ref1;
      ((_ref = this.link) != null ? _ref : this.link = document.createElement('a')).href = this.original;
      _ref1 = this.link, this.href = _ref1.href, this.protocol = _ref1.protocol, this.host = _ref1.host, this.hostname = _ref1.hostname, this.port = _ref1.port, this.pathname = _ref1.pathname, this.search = _ref1.search, this.hash = _ref1.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = __bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var _ref;
      if ((value > (_ref = this.value) && _ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return "" + this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*!
	Colorbox v1.4.27 - 2013-07-16
	jQuery lightbox and modal window plugin
	(c) 2013 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/

(function(t,e,i){function o(i,o,n){var r=e.createElement(i);return o&&(r.id=te+o),n&&(r.style.cssText=n),t(r)}function n(){return i.innerHeight?i.innerHeight:t(i).height()}function r(t){var e=E.length,i=(j+t)%e;return 0>i?e+i:i}function l(t,e){return Math.round((/%/.test(t)?("x"===e?H.width():n())/100:1)*parseInt(t,10))}function h(t,e){return t.photo||t.photoRegex.test(e)}function s(t,e){return t.retinaUrl&&i.devicePixelRatio>1?e.replace(t.photoRegex,t.retinaSuffix):e}function a(t){"contains"in v[0]&&!v[0].contains(t.target)&&(t.stopPropagation(),v.focus())}function d(){var e,i=t.data(A,Z);null==i?(O=t.extend({},Y),console&&console.log&&console.log("Error: cboxElement missing settings object")):O=t.extend({},i);for(e in O)t.isFunction(O[e])&&"on"!==e.slice(0,2)&&(O[e]=O[e].call(A));O.rel=O.rel||A.rel||t(A).data("rel")||"nofollow",O.href=O.href||t(A).attr("href"),O.title=O.title||A.title,"string"==typeof O.href&&(O.href=t.trim(O.href))}function c(i,o){t(e).trigger(i),se.trigger(i),t.isFunction(o)&&o.call(A)}function u(){var t,e,i,o,n,r=te+"Slideshow_",l="click."+te;O.slideshow&&E[1]?(e=function(){clearTimeout(t)},i=function(){(O.loop||E[j+1])&&(t=setTimeout(J.next,O.slideshowSpeed))},o=function(){R.html(O.slideshowStop).unbind(l).one(l,n),se.bind(ne,i).bind(oe,e).bind(re,n),v.removeClass(r+"off").addClass(r+"on")},n=function(){e(),se.unbind(ne,i).unbind(oe,e).unbind(re,n),R.html(O.slideshowStart).unbind(l).one(l,function(){J.next(),o()}),v.removeClass(r+"on").addClass(r+"off")},O.slideshowAuto?o():n()):v.removeClass(r+"off "+r+"on")}function p(i){G||(A=i,d(),E=t(A),j=0,"nofollow"!==O.rel&&(E=t("."+ee).filter(function(){var e,i=t.data(this,Z);return i&&(e=t(this).data("rel")||i.rel||this.rel),e===O.rel}),j=E.index(A),-1===j&&(E=E.add(A),j=E.length-1)),g.css({opacity:parseFloat(O.opacity),cursor:O.overlayClose?"pointer":"auto",visibility:"visible"}).show(),V&&v.add(g).removeClass(V),O.className&&v.add(g).addClass(O.className),V=O.className,O.closeButton?P.html(O.close).appendTo(x):P.appendTo("<div/>"),$||($=q=!0,v.css({visibility:"hidden",display:"block"}),W=o(ae,"LoadedContent","width:0; height:0; overflow:hidden"),x.css({width:"",height:""}).append(W),_=b.height()+k.height()+x.outerHeight(!0)-x.height(),D=T.width()+C.width()+x.outerWidth(!0)-x.width(),N=W.outerHeight(!0),z=W.outerWidth(!0),O.w=l(O.initialWidth,"x"),O.h=l(O.initialHeight,"y"),J.position(),u(),c(ie,O.onOpen),B.add(S).hide(),v.focus(),O.trapFocus&&e.addEventListener&&(e.addEventListener("focus",a,!0),se.one(le,function(){e.removeEventListener("focus",a,!0)})),O.returnFocus&&se.one(le,function(){t(A).focus()})),w())}function f(){!v&&e.body&&(X=!1,H=t(i),v=o(ae).attr({id:Z,"class":t.support.opacity===!1?te+"IE":"",role:"dialog",tabindex:"-1"}).hide(),g=o(ae,"Overlay").hide(),L=t([o(ae,"LoadingOverlay")[0],o(ae,"LoadingGraphic")[0]]),y=o(ae,"Wrapper"),x=o(ae,"Content").append(S=o(ae,"Title"),M=o(ae,"Current"),K=t('<button type="button"/>').attr({id:te+"Previous"}),I=t('<button type="button"/>').attr({id:te+"Next"}),R=o("button","Slideshow"),L),P=t('<button type="button"/>').attr({id:te+"Close"}),y.append(o(ae).append(o(ae,"TopLeft"),b=o(ae,"TopCenter"),o(ae,"TopRight")),o(ae,!1,"clear:left").append(T=o(ae,"MiddleLeft"),x,C=o(ae,"MiddleRight")),o(ae,!1,"clear:left").append(o(ae,"BottomLeft"),k=o(ae,"BottomCenter"),o(ae,"BottomRight"))).find("div div").css({"float":"left"}),F=o(ae,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),B=I.add(K).add(M).add(R),t(e.body).append(g,v.append(y,F)))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),p(this))}return v?(X||(X=!0,I.click(function(){J.next()}),K.click(function(){J.prev()}),P.click(function(){J.close()}),g.click(function(){O.overlayClose&&J.close()}),t(e).bind("keydown."+te,function(t){var e=t.keyCode;$&&O.escKey&&27===e&&(t.preventDefault(),J.close()),$&&O.arrowKey&&E[1]&&!t.altKey&&(37===e?(t.preventDefault(),K.click()):39===e&&(t.preventDefault(),I.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+te,"."+ee,i):t("."+ee).live("click."+te,i)),!0):!1}function w(){var n,r,a,u=J.prep,p=++de;q=!0,U=!1,A=E[j],d(),c(he),c(oe,O.onLoad),O.h=O.height?l(O.height,"y")-N-_:O.innerHeight&&l(O.innerHeight,"y"),O.w=O.width?l(O.width,"x")-z-D:O.innerWidth&&l(O.innerWidth,"x"),O.mw=O.w,O.mh=O.h,O.maxWidth&&(O.mw=l(O.maxWidth,"x")-z-D,O.mw=O.w&&O.w<O.mw?O.w:O.mw),O.maxHeight&&(O.mh=l(O.maxHeight,"y")-N-_,O.mh=O.h&&O.h<O.mh?O.h:O.mh),n=O.href,Q=setTimeout(function(){L.show()},100),O.inline?(a=o(ae).hide().insertBefore(t(n)[0]),se.one(he,function(){a.replaceWith(W.children())}),u(t(n))):O.iframe?u(" "):O.html?u(O.html):h(O,n)?(n=s(O,n),U=e.createElement("img"),t(U).addClass(te+"Photo").bind("error",function(){O.title=!1,u(o(ae,"Error").html(O.imgError))}).one("load",function(){var e;p===de&&(U.alt=t(A).attr("alt")||t(A).attr("data-alt")||"",O.retinaImage&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),O.scalePhotos&&(r=function(){U.height-=U.height*e,U.width-=U.width*e},O.mw&&U.width>O.mw&&(e=(U.width-O.mw)/U.width,r()),O.mh&&U.height>O.mh&&(e=(U.height-O.mh)/U.height,r())),O.h&&(U.style.marginTop=Math.max(O.mh-U.height,0)/2+"px"),E[1]&&(O.loop||E[j+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",setTimeout(function(){u(U)},1))}),setTimeout(function(){U.src=n},1)):n&&F.load(n,O.data,function(e,i){p===de&&u("error"===i?o(ae,"Error").html(O.xhrError):t(this).contents())})}var g,v,y,x,b,T,C,k,E,H,W,F,L,S,M,R,I,K,P,B,O,_,D,N,z,A,j,U,$,q,G,Q,J,V,X,Y={transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,trapFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0},Z="colorbox",te="cbox",ee=te+"Element",ie=te+"_open",oe=te+"_load",ne=te+"_complete",re=te+"_cleanup",le=te+"_closed",he=te+"_purge",se=t("<a/>"),ae="div",de=0,ce={};t.colorbox||(t(f),J=t.fn[Z]=t[Z]=function(e,i){var o=this;if(e=e||{},f(),m()){if(t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;i&&(e.onComplete=i),o.each(function(){t.data(this,Z,t.extend({},t.data(this,Z)||Y,e))}).addClass(ee),(t.isFunction(e.open)&&e.open.call(o)||e.open)&&p(o[0])}return o},J.position=function(e,i){function o(){b[0].style.width=k[0].style.width=x[0].style.width=parseInt(v[0].style.width,10)-D+"px",x[0].style.height=T[0].style.height=C[0].style.height=parseInt(v[0].style.height,10)-_+"px"}var r,h,s,a=0,d=0,c=v.offset();if(H.unbind("resize."+te),v.css({top:-9e4,left:-9e4}),h=H.scrollTop(),s=H.scrollLeft(),O.fixed?(c.top-=h,c.left-=s,v.css({position:"fixed"})):(a=h,d=s,v.css({position:"absolute"})),d+=O.right!==!1?Math.max(H.width()-O.w-z-D-l(O.right,"x"),0):O.left!==!1?l(O.left,"x"):Math.round(Math.max(H.width()-O.w-z-D,0)/2),a+=O.bottom!==!1?Math.max(n()-O.h-N-_-l(O.bottom,"y"),0):O.top!==!1?l(O.top,"y"):Math.round(Math.max(n()-O.h-N-_,0)/2),v.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:O.w+z+D,height:O.h+N+_,top:a,left:d},e){var u=0;t.each(r,function(t){return r[t]!==ce[t]?(u=e,void 0):void 0}),e=u}ce=r,e||v.css(r),v.dequeue().animate(r,{duration:e||0,complete:function(){o(),q=!1,y[0].style.width=O.w+z+D+"px",y[0].style.height=O.h+N+_+"px",O.reposition&&setTimeout(function(){H.bind("resize."+te,J.position)},1),i&&i()},step:o})},J.resize=function(t){var e;$&&(t=t||{},t.width&&(O.w=l(t.width,"x")-z-D),t.innerWidth&&(O.w=l(t.innerWidth,"x")),W.css({width:O.w}),t.height&&(O.h=l(t.height,"y")-N-_),t.innerHeight&&(O.h=l(t.innerHeight,"y")),t.innerHeight||t.height||(e=W.scrollTop(),W.css({height:"auto"}),O.h=W.height()),W.css({height:O.h}),e&&W.scrollTop(e),J.position("none"===O.transition?0:O.speed))},J.prep=function(i){function n(){return O.w=O.w||W.width(),O.w=O.mw&&O.mw<O.w?O.mw:O.w,O.w}function l(){return O.h=O.h||W.height(),O.h=O.mh&&O.mh<O.h?O.mh:O.h,O.h}if($){var a,d="none"===O.transition?0:O.speed;W.empty().remove(),W=o(ae,"LoadedContent").append(i),W.hide().appendTo(F.show()).css({width:n(),overflow:O.scrolling?"auto":"hidden"}).css({height:l()}).prependTo(x),F.hide(),t(U).css({"float":"none"}),a=function(){function i(){t.support.opacity===!1&&v[0].style.removeAttribute("filter")}var n,l,a=E.length,u="frameBorder",p="allowTransparency";$&&(l=function(){clearTimeout(Q),L.hide(),c(ne,O.onComplete)},S.html(O.title).add(W).show(),a>1?("string"==typeof O.current&&M.html(O.current.replace("{current}",j+1).replace("{total}",a)).show(),I[O.loop||a-1>j?"show":"hide"]().html(O.next),K[O.loop||j?"show":"hide"]().html(O.previous),O.slideshow&&R.show(),O.preloading&&t.each([r(-1),r(1)],function(){var i,o,n=E[this],r=t.data(n,Z);r&&r.href?(i=r.href,t.isFunction(i)&&(i=i.call(n))):i=t(n).attr("href"),i&&h(r,i)&&(i=s(r,i),o=e.createElement("img"),o.src=i)})):B.hide(),O.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),p in n&&(n[p]="true"),O.scrolling||(n.scrolling="no"),t(n).attr({src:O.href,name:(new Date).getTime(),"class":te+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",l).appendTo(W),se.one(he,function(){n.src="//about:blank"}),O.fastIframe&&t(n).trigger("load")):l(),"fade"===O.transition?v.fadeTo(d,1,i):i())},"fade"===O.transition?v.fadeTo(d,0,function(){J.position(0,a)}):J.position(d,a)}},J.next=function(){!q&&E[1]&&(O.loop||E[j+1])&&(j=r(1),p(E[j]))},J.prev=function(){!q&&E[1]&&(O.loop||j)&&(j=r(-1),p(E[j]))},J.close=function(){$&&!G&&(G=!0,$=!1,c(re,O.onCleanup),H.unbind("."+te),g.fadeTo(O.fadeOut||0,0),v.stop().fadeTo(O.fadeOut||0,0,function(){v.add(g).css({opacity:1,cursor:"auto"}).hide(),c(he),W.empty().remove(),setTimeout(function(){G=!1,c(le,O.onClosed)},1)}))},J.remove=function(){v&&(v.stop(),t.colorbox.close(),v.stop().remove(),g.remove(),G=!1,v=null,t("."+ee).removeData(Z).removeClass(ee),t(e).unbind("click."+te))},J.element=function(){return t(A)},J.settings=Y)})(jQuery,document,window);
// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//


(function($){
  // injecting colorbox nodes when using turbolinks
  $colorboxOverlay = '';
  $colorboxBox = '';

  $(document).on('ready', function() {
    $colorboxOverlay = $("#cboxOverlay");
    $colorboxBox = $("#colorbox");
  
    $(document).on('click', '[data-colorbox="true"]', function(e) {
      e.preventDefault();

      $.colorbox({
        height: $(this).data("colorbox-height") || false,
        width: $(this).data("colorbox-width") || false,
        maxWidth: $(this).data("colorbox-max-width") || false,
        maxHeight: $(this).data("colorbox-max-height") || false,
        iframe: $(this).data("colorbox-iframe") || false,
        photo: $(this).data("colorbox-photo") || false,
        innerHeight: $(this).data("colorbox-innerheight") || false,
        innerWidth: $(this).data("colorbox-innerwidth") || false,
        title: $(this).data("colorbox-title") || false,
        className: $(this).data("colorbox-class-name") || false,
        href: $(this).data("colorbox-href") || $(this).attr('href'),
        html: $(this).data("colorbox-html") || false,
        inline: $(this).data("colorbox-inline") || false,
        opacity: 0.5
      });
    });

    $('[data-colorbox-static="true"]').colorbox({ 
      height: function() { return $(this).data("colorbox-height") || false },
      width: function() { return $(this).data("colorbox-width") || false },
      maxWidth: function() { return $(this).data("colorbox-max-width") || false },
      maxHeight: function() { return $(this).data("colorbox-max-height") || false },
      iframe: function() { return $(this).data("colorbox-iframe") || false },
      photo: function() { return $(this).data("colorbox-photo") || false },
      innerHeight: function() { return $(this).data("colorbox-innerheight") || false },
      innerWidth: function() { return $(this).data("colorbox-innerwidth") || false },
      title: function() { return $(this).data("colorbox-title") || false },
      className: function() { return $(this).data("colorbox-class-name") || false },
      href: function() { return $(this).data("colorbox-href") || $(this).attr('href') },
      html: function() { return $(this).data("colorbox-html") || false },
      inline: function() { return $(this).data("colorbox-inline") || false },
      opacity: 0.5
    });
  });
  
  $(document).on('page:change', function() {
      if($colorboxOverlay)
          $colorboxOverlay.appendTo("body");

      if($colorboxBox)
          $colorboxBox.appendTo("body");
  });      

}) (jQuery);
(function() {


}).call(this);
// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
document.createElement("canvas").getContext||function(){function C(){}function B(a){this.type_=a,this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0,this.colors_=[]}function A(a,b,c){!z(b)||(a.m_=b,c&&(a.lineScale_=f(e(b[0][0]*b[1][1]-b[0][1]*b[1][0]))))}function z(a){var b=0;for(;b<3;b++){var c=0;for(;c<2;c++)if(!isFinite(a[b][c])||isNaN(a[b][c]))return!1}return!0}function y(a,b,c,d){a.currentPath_.push({type:"bezierCurveTo",cp1x:b.x,cp1y:b.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y}),a.currentX_=d.x,a.currentY_=d.y}function w(a){this.m_=r(),this.mStack_=[],this.aStack_=[],this.currentPath_=[],this.fillStyle=this.strokeStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=g*1,this.globalAlpha=1,this.canvas=a;var b=a.ownerDocument.createElement("div");b.style.width=a.clientWidth+"px",b.style.height=a.clientHeight+"px",b.style.overflow="hidden",b.style.position="absolute",a.appendChild(b),this.element_=b,this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}function v(a){switch(a){case"butt":return"flat";case"round":return"round";case"square":default:return"square"}}function u(a){var b,c=1;a=String(a);if(a.substring(0,3)=="rgb"){var d=a.indexOf("(",3),e=a.indexOf(")",d+1),f=a.substring(d+1,e).split(",");b="#";var g=0;for(;g<3;g++)b+=o[Number(f[g])];f.length==4&&a.substr(3,1)=="a"&&(c=f[3])}else b=a;return{color:b,alpha:c}}function t(a,b){b.fillStyle=a.fillStyle,b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.lineWidth=a.lineWidth,b.miterLimit=a.miterLimit,b.shadowBlur=a.shadowBlur,b.shadowColor=a.shadowColor,b.shadowOffsetX=a.shadowOffsetX,b.shadowOffsetY=a.shadowOffsetY,b.strokeStyle=a.strokeStyle,b.globalAlpha=a.globalAlpha,b.arcScaleX_=a.arcScaleX_,b.arcScaleY_=a.arcScaleY_,b.lineScale_=a.lineScale_}function s(a,b){var c=r(),d=0;for(;d<3;d++){var e=0;for(;e<3;e++){var f=0,g=0;for(;g<3;g++)f+=a[d][g]*b[g][e];c[d][e]=f}}return c}function r(){return[[1,0,0],[0,1,0],[0,0,1]]}function n(a){var b=a.srcElement;b.firstChild&&(b.firstChild.style.width=b.clientWidth+"px",b.firstChild.style.height=b.clientHeight+"px")}function m(a){var b=a.srcElement;switch(a.propertyName){case"width":b.style.width=b.attributes.width.nodeValue+"px",b.getContext().clearRect();break;case"height":b.style.height=b.attributes.height.nodeValue+"px",b.getContext().clearRect()}}function k(a,b){var c=j.call(arguments,2);return function(){return a.apply(b,c.concat(j.call(arguments)))}}function i(){return this.context_||(this.context_=new w(this))}var a=Math,b=a.round,c=a.sin,d=a.cos,e=a.abs,f=a.sqrt,g=10,h=g/2,j=Array.prototype.slice,l={init:function(a){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var b=a||document;b.createElement("canvas"),b.attachEvent("onreadystatechange",k(this.init_,this,b))}},init_:function(a){a.namespaces.g_vml_||a.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML"),a.namespaces.g_o_||a.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!a.styleSheets.ex_canvas_){var b=a.createStyleSheet();b.owningElement.id="ex_canvas_",b.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}var c=a.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},initElement:function(a){if(!a.getContext){a.getContext=i,a.innerHTML="",a.attachEvent("onpropertychange",m),a.attachEvent("onresize",n);var b=a.attributes;b.width&&b.width.specified?a.style.width=b.width.nodeValue+"px":a.width=a.clientWidth,b.height&&b.height.specified?a.style.height=b.height.nodeValue+"px":a.height=a.clientHeight}return a}};l.init();var o=[],p=0;for(;p<16;p++){var q=0;for(;q<16;q++)o[p*16+q]=p.toString(16)+q.toString(16)}var x=w.prototype;x.clearRect=function(){this.element_.innerHTML=""},x.beginPath=function(){this.currentPath_=[]},x.moveTo=function(a,b){var c=this.getCoords_(a,b);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y}),this.currentX_=c.x,this.currentY_=c.y},x.lineTo=function(a,b){var c=this.getCoords_(a,b);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y}),this.currentX_=c.x,this.currentY_=c.y},x.bezierCurveTo=function(a,b,c,d,e,f){var g=this.getCoords_(e,f),h=this.getCoords_(a,b),i=this.getCoords_(c,d);y(this,h,i,g)},x.quadraticCurveTo=function(a,b,c,d){var e=this.getCoords_(a,b),f=this.getCoords_(c,d),g={x:this.currentX_+.6666666666666666*(e.x-this.currentX_),y:this.currentY_+.6666666666666666*(e.y-this.currentY_)};y(this,g,{x:g.x+(f.x-this.currentX_)/3,y:g.y+(f.y-this.currentY_)/3},f)},x.arc=function(a,b,e,f,i,j){e*=g;var k=j?"at":"wa",l=a+d(f)*e-h,m=b+c(f)*e-h,n=a+d(i)*e-h,o=b+c(i)*e-h;l==n&&!j&&(l+=.125);var p=this.getCoords_(a,b),q=this.getCoords_(l,m),r=this.getCoords_(n,o);this.currentPath_.push({type:k,x:p.x,y:p.y,radius:e,xStart:q.x,yStart:q.y,xEnd:r.x,yEnd:r.y})},x.rect=function(a,b,c,d){this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath()},x.strokeRect=function(a,b,c,d){var e=this.currentPath_;this.beginPath(),this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath(),this.stroke(),this.currentPath_=e},x.fillRect=function(a,b,c,d){var e=this.currentPath_;this.beginPath(),this.moveTo(a,b),this.lineTo(a+c,b),this.lineTo(a+c,b+d),this.lineTo(a,b+d),this.closePath(),this.fill(),this.currentPath_=e},x.createLinearGradient=function(a,b,c,d){var e=new B("gradient");e.x0_=a,e.y0_=b,e.x1_=c,e.y1_=d;return e},x.createRadialGradient=function(a,b,c,d,e,f){var g=new B("gradientradial");g.x0_=a,g.y0_=b,g.r0_=c,g.x1_=d,g.y1_=e,g.r1_=f;return g},x.drawImage=function(c){var d,e,f,h,i,j,k,l,m=c.runtimeStyle.width,n=c.runtimeStyle.height;c.runtimeStyle.width="auto",c.runtimeStyle.height="auto";var o=c.width,p=c.height;c.runtimeStyle.width=m,c.runtimeStyle.height=n;if(arguments.length==3)d=arguments[1],e=arguments[2],i=j=0,k=f=o,l=h=p;else if(arguments.length==5)d=arguments[1],e=arguments[2],f=arguments[3],h=arguments[4],i=j=0,k=o,l=p;else if(arguments.length==9)i=arguments[1],j=arguments[2],k=arguments[3],l=arguments[4],d=arguments[5],e=arguments[6],f=arguments[7],h=arguments[8];else throw Error("Invalid number of arguments");var q=this.getCoords_(d,e),r=[];r.push(" <g_vml_:group",' coordsize="',g*10,",",g*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var s=[];s.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",b(q.x/g),",","Dy=",b(q.y/g),"");var t=q,u=this.getCoords_(d+f,e),v=this.getCoords_(d,e+h),w=this.getCoords_(d+f,e+h);t.x=a.max(t.x,u.x,v.x,w.x),t.y=a.max(t.y,u.y,v.y,w.y),r.push("padding:0 ",b(t.x/g),"px ",b(t.y/g),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",s.join(""),", sizingmethod='clip');")}else r.push("top:",b(q.y/g),"px;left:",b(q.x/g),"px;");r.push(' ">','<g_vml_:image src="',c.src,'"',' style="width:',g*f,"px;"," height:",g*h,'px;"',' cropleft="',i/o,'"',' croptop="',j/p,'"',' cropright="',(o-i-k)/o,'"',' cropbottom="',(p-j-l)/p,'"'," />","</g_vml_:group>"),this.element_.insertAdjacentHTML("BeforeEnd",r.join(""))},x.stroke=function(c){var d=[],e=u(c?this.fillStyle:this.strokeStyle),f=e.color,h=e.alpha*this.globalAlpha;d.push("<g_vml_:shape",' filled="',!!c,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',g*10," ",g*10,'"',' stroked="',!c,'"',' path="');var i={x:null,y:null},j={x:null,y:null},k=0;for(;k<this.currentPath_.length;k++){var l=this.currentPath_[k];switch(l.type){case"moveTo":d.push(" m ",b(l.x),",",b(l.y));break;case"lineTo":d.push(" l ",b(l.x),",",b(l.y));break;case"close":d.push(" x "),l=null;break;case"bezierCurveTo":d.push(" c ",b(l.cp1x),",",b(l.cp1y),",",b(l.cp2x),",",b(l.cp2y),",",b(l.x),",",b(l.y));break;case"at":case"wa":d.push(" ",l.type," ",b(l.x-this.arcScaleX_*l.radius),",",b(l.y-this.arcScaleY_*l.radius)," ",b(l.x+this.arcScaleX_*l.radius),",",b(l.y+this.arcScaleY_*l.radius)," ",b(l.xStart),",",b(l.yStart)," ",b(l.xEnd),",",b(l.yEnd))}if(l){if(i.x==null||l.x<i.x)i.x=l.x;if(j.x==null||l.x>j.x)j.x=l.x;if(i.y==null||l.y<i.y)i.y=l.y;if(j.y==null||l.y>j.y)j.y=l.y}}d.push(' ">');if(c)if(typeof this.fillStyle=="object"){var m=this.fillStyle,n=0,o={x:0,y:0},p=0,q=1;if(m.type_=="gradient"){var r=m.x1_/this.arcScaleX_,s=m.y1_/this.arcScaleY_,t=this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),w=this.getCoords_(r,s);n=Math.atan2(w.x-t.x,w.y-t.y)*180/Math.PI,n<0&&(n+=360),n<1e-6&&(n=0)}else{var t=this.getCoords_(m.x0_,m.y0_),x=j.x-i.x,y=j.y-i.y;o={x:(t.x-i.x)/x,y:(t.y-i.y)/y},x/=this.arcScaleX_*g,y/=this.arcScaleY_*g;var z=a.max(x,y);p=2*m.r0_/z,q=2*m.r1_/z-p}var A=m.colors_;A.sort(function(a,b){return a.offset-b.offset});var B=A.length,C=A[0].color,D=A[B-1].color,E=A[0].alpha*this.globalAlpha,F=A[B-1].alpha*this.globalAlpha,G=[],k=0;for(;k<B;k++){var H=A[k];G.push(H.offset*q+p+" "+H.color)}d.push('<g_vml_:fill type="',m.type_,'"',' method="none" focus="100%"',' color="',C,'"',' color2="',D,'"',' colors="',G.join(","),'"',' opacity="',F,'"',' g_o_:opacity2="',E,'"',' angle="',n,'"',' focusposition="',o.x,",",o.y,'" />')}else d.push('<g_vml_:fill color="',f,'" opacity="',h,'" />');else{var I=this.lineScale_*this.lineWidth;I<1&&(h*=I),d.push("<g_vml_:stroke",' opacity="',h,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',v(this.lineCap),'"',' weight="',I,'px"',' color="',f,'" />')}d.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",d.join(""))},x.fill=function(){this.stroke(!0)},x.closePath=function(){this.currentPath_.push({type:"close"})},x.getCoords_=function(a,b){var c=this.m_;return{x:g*(a*c[0][0]+b*c[1][0]+c[2][0])-h,y:g*(a*c[0][1]+b*c[1][1]+c[2][1])-h}},x.save=function(){var a={};t(this,a),this.aStack_.push(a),this.mStack_.push(this.m_),this.m_=s(r(),this.m_)},x.restore=function(){t(this.aStack_.pop(),this),this.m_=this.mStack_.pop()},x.translate=function(a,b){A(this,s([[1,0,0],[0,1,0],[a,b,1]],this.m_),!1)},x.rotate=function(a){var b=d(a),e=c(a);A(this,s([[b,e,0],[-e,b,0],[0,0,1]],this.m_),!1)},x.scale=function(a,b){this.arcScaleX_*=a,this.arcScaleY_*=b,A(this,s([[a,0,0],[0,b,0],[0,0,1]],this.m_),!0)},x.transform=function(a,b,c,d,e,f){A(this,s([[a,b,0],[c,d,0],[e,f,1]],this.m_),!0)},x.setTransform=function(a,b,c,d,e,f){A(this,[[a,b,0],[c,d,0],[e,f,1]],!0)},x.clip=function(){},x.arcTo=function(){},x.createPattern=function(){return new C},B.prototype.addColorStop=function(a,b){b=u(b),this.colors_.push({offset:a,color:b.color,alpha:b.alpha})},G_vmlCanvasManager=l,CanvasRenderingContext2D=w,CanvasGradient=B,CanvasPattern=C}();
(function() {


}).call(this);
/*! jQuery v1.8.3 jquery.com | jquery.org/license */

(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery-1.8.3.min.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("jquery-1.8.3.min.js");break}}}}})();
/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/

(function(a){a.fn.museOverlay=function(b){var c=a.extend({autoOpen:!0,offsetLeft:0,offsetTop:0,$overlaySlice:a(),$overlayWedge:a(),duration:300,overlayExtraWidth:0,overlayExtraHeight:0,$elasticContent:a()},b);return this.each(function(){var d=a(this).data("museOverlay");if(d&&d[b]!==void 0)return d[b].apply(this,Array.prototype.slice.call(arguments,1));var f=a("<div></div>").appendTo("body").css({position:"absolute",top:0,left:0,zIndex:100001}).hide(),g=a("<div></div>").append(c.$overlaySlice).appendTo(f).css({position:"absolute",
top:0,left:0}),j=a(this).css({position:"absolute",left:0,top:0}).appendTo(f),h=a(window),l=h.data("scrollWrapper"),k,i,n=null,o=c.$elasticContent,p=o.length?parseInt(o.css("padding-left"))+parseInt(o.css("padding-right"))+parseInt(o.css("border-left-width"))+parseInt(o.css("border-right-width")):0,q=o.length?parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom"))+parseInt(o.css("border-top-width"))+parseInt(o.css("border-bottom-width")):0,m={isOpen:!1,open:function(){if(!m.isOpen)k=h.width(),
i=h.height(),m.positionContent(k,i),f.show(),g.bind("click",m.close),g.css({opacity:0}).stop(!0),j.css({opacity:0}).stop(!0),g.bind("click",m.close).animate({opacity:0.99},{queue:!1,duration:c.duration,complete:function(){g.css({opacity:""});j.animate({opacity:1},{queue:!1,duration:c.duration,complete:function(){j.css({opacity:""});m.applyPageDimensions()}})}}),a(document).bind("keydown",m.onKeyDown),m.doLayout(k,i),m.isOpen=!0,h.bind("resize",m.onWindowResize)},close:function(){g.unbind("click",
m.close);h.unbind("resize",m.onWindowResize);a(document).unbind("keydown",m.onKeyDown);if(c.onClose)c.onClose();g.css({opacity:0.99}).stop(!0);j.css({opacity:0.99}).stop(!0);j.animate({opacity:0},{queue:!1,duration:c.duration,complete:function(){g.animate({opacity:0},{queue:!1,duration:c.duration,complete:function(){f.hide();j.css({opacity:""});g.css({opacity:""})}})}});m.isOpen=!1},onKeyDown:function(a){a.keyCode===27&&m.close()},onWindowResize:function(){var a=h.width(),b=h.height();(k!=a||i!=b)&&
n==null&&(n=setTimeout(function(){m.doLayout(h.width(),h.height());m.positionContent(h.width(),h.height());n=null},10))},doLayout:function(a,b){f.css({width:0,height:0});c.$overlayWedge.css({width:0,height:0});var d=a-p,g=b-q;o.length&&o.hasClass("fullwidth")&&(o.width(d),c.resizeSlidesFn&&c.resizeSlidesFn(d,g));m.applyPageDimensions()},applyPageDimensions:function(){var b=a(document),d=b.width(),b=b.height(),g=document.documentElement||document.body;g.clientWidth!=g.offsetWidth&&(d=g.scrollWidth-
1);g.clientHeight!=g.offsetHeight&&b<g.scrollHeight&&(b=g.scrollHeight-1);f.css({width:d,height:b});c.$overlayWedge.css({width:d-c.overlayExtraWidth,height:b-c.overlayExtraHeight})},positionContent:function(a,b){var d=(l||h).scrollLeft()+Math.max(0,a/2+c.offsetLeft),g=(l||h).scrollTop()+Math.max(0,b/2+c.offsetTop);j.css({top:g,left:d});o.length&&o.hasClass("fullwidth")&&o.css("left",-d);d=a-p;g=b-q;o.length&&(o.width(d),o.hasClass("fullscreen")&&o.height(g),c.resizeSlidesFn&&c.resizeSlidesFn(d,g))}};
j.data("museOverlay",m);c.autoShow&&m.open()})}})(jQuery);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery.museoverlay.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.museoverlay.js");break}}}}})();
/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/

(function(a){function b(a){var b=a.css("background-image");a.css("background-image","");var c=a.css("background-image");b!=c&&a.css("background-image",b);return c.replace(/^\s*url\(\"?/,"").replace(/['"]?\)$/,"")}if(!Muse.Browser.Features.checkCSSFeature("background-size")){var c=function(c){var d=a(c),j=b(d),h=document.createElement("img"),l=document.createElement("div"),i=this,k=!1,n=!1,o=!0,p={};a(l).css({overflow:"hidden",position:"absolute",top:"0px",left:"0px",width:c.clientWidth+"px",height:c.clientHeight+
"px",marginBottom:"-"+c.clientHeight+"px",marginRight:"-"+c.clientWidth+"px",zIndex:"-1"}).addClass("museBgSizePolyfill");h.src=j;h.alt="";h.style.position="absolute";l.appendChild(h);c.children.length>0?c.insertBefore(l,c.children[0]):c.appendChild(l);if(c===document.body)d=a("html"),c=d.get(0),j=b(d),h.src=j,d.css("background-attachment")=="fixed"?(l.style.position="fixed",o=!1):l.style.position="absolute";else if(d.is("#page"))d.css("marginLeft").toLowerCase()=="auto"&&(n=!0),l.style.top=d.offset().top+
parseInt(d.css("borderTopWidth"))+"px",l.style.bottom=parseInt(d.parent().css("paddingBottom"))+parseInt(d.css("borderBottomWidth"))+"px",l.style.left=d.offset().left+parseInt(d.css("borderLeftWidth"))+"px",l.style.right=d.offset().left+parseInt(d.css("borderRightWidth"))+"px",l.style.zIndex=0;else if(d.css("position")=="static")c.style.position="relative";this.reloadImage=function(){var a=b(d),j=d.css("background-color");if(a!=h.src)h.src=a;c.style.backgroundImage="none";c.style.backgroundColor=
"transparent";l.style.backgroundColor=j;a=(d.css("background-position-x")+" "+d.css("background-position-y")).replace(/^\s+/,"").replace(/\s+$/,"").split(/\s+/);a.length==1&&a[0].indexOf("center")>=0&&a.push("center");if(d.data("hasBackgroundPositionScrollEffect")!=!0)for(var j=0,i=a.length;j<i;j++)switch(a[j]){case "center":case "50%":j==0?(h.style.right="",h.style.left="50%",h.style.marginLeft="-"+Math.ceil(h.offsetWidth/2)+"px"):(h.style.bottom="",h.style.top="50%",h.style.marginTop="-"+Math.ceil(h.offsetHeight/
2)+"px");break;case "left":h.style.right="";h.style.left="0px";h.style.marginLeft="0px";break;case "right":h.style.left="";h.style.right="0px";h.style.marginLeft="0px";break;case "top":h.style.bottom="";h.style.top="0px";h.style.marginTop="0px";break;case "bottom":h.style.top="";h.style.bottom="0px";h.style.marginTop="0px";break;default:j==0?(h.style.left=a[j],h.style.marginLeft="-"+Math.ceil(h.offsetWidth/2)+"px"):(h.style.top=a[j],h.style.marginTop="-"+Math.ceil(h.offsetHeight/2)+"px")}};this.resizeImage=
function(a){var b=c.getBoundingClientRect(),j=c.scrollWidth-(Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder?b.right-b.left-d.innerWidth():0),b=c.scrollHeight-(Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder?b.bottom-b.top-d.innerHeight():0),j=!o?c.clientWidth:Math.max(j,c.clientWidth),b=!o?c.clientHeight:Math.max(b,c.clientHeight);!p[h.src]&&h.clientWidth&&(p[h.src]={width:h.clientWidth,height:h.clientHeight});var i=j/(p[h.src]?p[h.src].width:1),k=b/(p[h.src]?p[h.src].height:1);l.style.height=
b+"px";l.style.marginBottom="-"+b+"px";l.style.width=j+"px";l.style.marginRight="-"+j+"px";i<k==a?(h.style.height=b+1+"px",h.style.width="auto"):(h.style.width=j+1+"px",h.style.height="auto")};this.update=function(){if(k){c.style.backgroundImage="";d.css("background-color","");var a=d.css("background-image").toLowerCase(),b=(c.currentStyle||window.getComputedStyle(c,null))["background-size"];b&&b.toLowerCase();if(a!="none"&&(b=="cover"||b=="contain")){if(i.reloadImage(),l.style.display="block",l.style.width=
"0px",l.style.height="0px",i.resizeImage(b=="cover"),n)l.style.left=d.offset().left+parseInt(d.css("borderLeftWidth"))+"px",l.style.right=d.offset().left+parseInt(d.css("borderRightWidth"))+"px"}else l.style.display="none"}};if(h.complete||j=="none")k=!0;else a(h).one("load",function(){k=!0;i.update()});this.update()},d=function(){this.updateList=[]};d.prototype.initialize=function(b){var d=this;b.each(function(){var b=new c(this);this!==document.body?d.updateList.push(b):(a(window).resize(function(){setTimeout(function(){b.update()},
10)}),a(window).load(function(){setTimeout(function(){b.update()},10)}))});var j=d.updateList.length;j>0&&setInterval(function(){for(var a=0;a<j;a++)d.updateList[a].update()},Math.max(120,16*j))};a(window).data("musePolyfill.bgSize",new d)}})(jQuery);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery.musepolyfill.bgsize.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.musepolyfill.bgsize.js");break}}}}})();
/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2013 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/

(function(a){var b=a("#page"),c=a(window),d=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.cssProxy=this.service.cssProxy;this.enabled=c&&0<c.length;this.visible=!0;this.isMarkedAsOOV=!1;this.hasPreInitClass=this.elem.hasClass(d.HIDDEN_CLASS)};d.HIDDEN_CLASS="mse_pre_init";d.prototype.clone=function(a){a.hasClass(d.HIDDEN_CLASS)||a.addClass(d.HIDDEN_CLASS);a.registerGenericScrollEffect(d,this.data)};d.prototype.initialize=function(){this.referenceOffset=this.data[0]["in"][1];this.elemWidth=
this.elem.innerWidth();this.elemHeight=this.elem.innerHeight();this.skipVisibleCheck=this.elemWidth<1;for(var a,b=0,c;c=this.data[b];b++)c.length=c["in"][1]-c["in"][0],c.startPosition=a?{left:a.startPosition.left+a.length*a.speed[0],top:a.startPosition.top+a.length*a.speed[1]}:{left:-c.length*c.speed[0],top:-c.length*c.speed[1]},a=c};d.prototype.update=function(a,b,c){var g=this.elementLeft-c.scrollLeft,f=this.elementTop-this.referenceOffset,h=a.startPosition.left+a.speed[0]*b,b=a.startPosition.top+
a.speed[1]*b,j={};if("number"==typeof a.speed[0])j.left=g+h+"px";if("number"==typeof a.speed[1])j.top=f-b+"px";if(this.visible=this.skipVisibleCheck||this.getVisible(g+h,f-b,c)){if(this.isMarkedAsOOV)j.display="",this.isMarkedAsOOV=!1;this.cssProxy.setCSSProperties(this.elem,j)}else if(!this.isMarkedAsOOV)this.cssProxy.setCSSProperties(this.elem,{display:"none"}),this.isMarkedAsOOV=!0;if(this.hasPreInitClass)this.elem.removeClass(d.HIDDEN_CLASS),this.hasPreInitClass=!1};d.prototype.getVisible=function(a,
b,c){var d=Math.max(this.elemWidth,this.elemHeight)+100;return(void 0===a||a+d>0&&a-d<c.windowWidth)&&(void 0===b||b+d>0&&b-d<c.windowHeight)};var f=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.cssProxy=this.service.cssProxy;this.r7Mode=!0;if(!this.r7Mode&&(this.cssBackgroundPosition=this.elem.css("background-position"),this.cssBackgroundPosition.match(/^\d+\%$/gi)))this.cssBackgroundPosition=(a=this.elem[0].currentStyle)&&a.backgroundPositionX&&a.backgroundPositionY?a.backgroundPositionX+
" "+a.backgroundPositionY:Muse.Utils.getRuleProperty(this.getCSSRule(),"background-position");if(this.useBackgroundFixedOptimization()){this.elem.css("background-attachment","fixed");if(this.r7Mode)this.enabled=!1;this.backgroundFixedMode=!0}this.elem.data("hasBackgroundPositionScrollEffect",!0)};f.BG_NORMAL=0;f.BG_COVER=1;f.BG_CONTAIN=2;f.prototype.getCSSRule=function(){if(!this.pageSheet)this.pageStyleSheet=Muse.Utils.getPageStyleSheet();if(!this.cssRule)this.cssRule=Muse.Utils.getStyleSheetRuleById(this.pageStyleSheet,
this.elem.attr("id"));return this.cssRule};f.prototype.useBackgroundFixedOptimization=function(){if(!c.data("scrollWrapper").isStandard())return!1;return 0==this.data[0].speed[0]&&0==this.data[0].speed[1]&&0==this.data[1].speed[0]&&0==this.data[1].speed[1]};f.prototype.initialize=function(){this.referenceOffset=this.data[0]["in"][1];var b=this.elem.parent();this.is100PercentWidth=b.hasClass("browser_width");this.hasPositionEffect=(this.positionEffect=this.service.getElementEffect(this.is100PercentWidth?
b:this.elem,d))&&this.positionEffect.enabled;for(var b=0,g,f;g=this.data[b];b++)g.speed[0]-=0,g.speed[1]-=1,g.length=g["in"][1]-g["in"][0],g.startPosition=null==f?{left:-g.length*g.speed[0],top:-g.length*g.speed[1]}:{left:f.startPosition.left+f.length*f.speed[0],top:f.startPosition.top+f.length*f.speed[1]},f=g;if(!Muse.Browser.Features.checkCSSFeature("background-size")&&this.elem.hasClass("museBGSize")&&0<a("> .museBgSizePolyfill",this.elem).length)this.polyfillElement=a(a(".museBgSizePolyfill img",
this.elem)[0]);this.bgMode=this.getBgMode();this.backgroundOffsetAvailable=!1;this.elem.resize(this,this.onElementResize);this.is100PercentWidth&&c.resize(this,this.onWindowResize);this.backgroundPosition=this.getBackgroundPosition();this.getBackgroundOffset();if(this.elem.hasClass("browser_width"))this.originalWidth=Muse.Utils.tryParse(Muse.Utils.getRuleProperty(this.getCSSRule(),"width"),parseInt)};f.prototype.onWindowResize=function(a){a.data.recalculateBackgroundOffset=!0};f.prototype.onElementResize=
function(a){var a=a.data,b=a.service.getEffectProgress(),c=a.service.getEffectInterval(a,b);a.update(c,b-c["in"][0])};f.prototype.hasOriginalWidth=function(){return Muse.Utils.isDefined(this.originalWidth)&&-1!=this.originalWidth};f.prototype.getDeltaWidth=function(){if(!this.hasOriginalWidth())return 0;return(this.elem.innerWidth()-this.originalWidth)*this.backgroundPosition.multiplier.x};f.prototype.getBackgroundModeDisplayRatio=function(){switch(this.bgMode){case f.BG_CONTAIN:return Math.min(this.elem.innerWidth()/
this.backgroundSize.width,this.elem.innerHeight()/this.backgroundSize.height);case f.BG_COVER:return Math.max(this.elem.innerWidth()/this.backgroundSize.width,this.elem.innerHeight()/this.backgroundSize.height);default:return 1}};f.prototype.updateFixedBackground=function(a,b){var c=this.getBackgroundModeDisplayRatio(),d=this.elem.offset(),g=d.left,h=d.top-this.referenceOffset;if(this.hasPositionEffect&&0==this.positionEffect.data[this.data.indexOf(a)].speed[1]||!this.hasPositionEffect&&"fixed"==
this.elem.css("position"))h=d.top-(a["in"][0]+b);d=(f.BG_COVER!==this.bgMode||!this.is100PercentWidth?g:0)+this.backgroundPosition.multiplier.x*(this.elem.width()-c*this.backgroundSize.width)+Muse.Utils.getCSSIntValue(this.elem,"border-left-width");h=h+this.backgroundPosition.multiplier.y*(this.elem.height()-c*this.backgroundSize.height)+Muse.Utils.getCSSIntValue(this.elem,"border-top-width");h={"background-position":d+"px "+h+"px"};1!=c&&(h["background-size"]=c*this.backgroundSize.width+"px "+c*
this.backgroundSize.height+"px");this.cssProxy.setCSSProperties(this.elem,h)};f.prototype.update=function(a,b){if(this.backgroundOffsetAvailable){if(this.recalculateBackgroundOffset)this.recalculateBackgroundOffset=!1,this.getBackgroundOffset();if(this.backgroundFixedMode)this.updateFixedBackground(a,b);else{var c=this.getBackgroundModeDisplayRatio()-1,d=Math.floor(this.bgOffset.x-c*this.backgroundPosition.multiplier.x*this.backgroundSize.width+this.getDeltaWidth())+a.startPosition.left+a.speed[0]*
b,c=Math.floor(this.bgOffset.y-c*this.backgroundPosition.multiplier.y*this.backgroundSize.height)-(a.startPosition.top+a.speed[1]*b);this.polyfillElement?(d={"margin-left":d+"px","margin-top":c+"px",left:0,top:0},this.cssProxy.setCSSProperties(this.polyfillElement,d)):(d={"background-attachment":"scroll","background-position":d+"px "+c+"px"},this.cssProxy.setCSSProperties(this.elem,d))}}else this.updateRequested=!0};f.prototype.getBackgroundOffset=function(){var a=Muse.Utils.tryParse(this.backgroundPosition.x,
parseFloat,0),b=Muse.Utils.tryParse(this.backgroundPosition.y,parseFloat,0);if(!Muse.Utils.endsWith(this.backgroundPosition.x,"%")&&!Muse.Utils.endsWith(this.backgroundPosition.y,"%"))this.onBackgroundOffsetAvailable(a,b);else if(this.backgroundSize)this.updateBackgroundOffset(a,b);else{var c=this;this.getBackgroundSize(function(d){c.backgroundSize=d;c.updateBackgroundOffset(a,b);if(c.updateRequested){c.updateRequested=!1;var d=c.service.getEffectProgress(),g=c.service.getEffectInterval(c,d);c.update(g,
d-g["in"][0])}})}};f.prototype.updateBackgroundOffset=function(a,b){var c=this.is100PercentWidth&&this.hasPositionEffect&&this.positionEffect.isMarkedAsOOV?this.elem.parent():this.elem;if(Muse.Utils.endsWith(this.backgroundPosition.x,"%"))var d=Muse.Utils.firstDefined(this.originalWidth,c.innerWidth()),a=a/100*(d-Muse.Utils.firstDefined(this.backgroundSize.width,d));Muse.Utils.endsWith(this.backgroundPosition.y,"%")&&(c=c.innerHeight(),b=b/100*(c-Muse.Utils.firstDefined(this.backgroundSize.height,
c)));this.onBackgroundOffsetAvailable(a,b)};f.prototype.onBackgroundOffsetAvailable=function(a,b){this.bgOffset={x:a,y:b};this.backgroundOffsetAvailable=!0};f.prototype.getBgMode=function(){var a=(this.elem.get(0).currentStyle||window.getComputedStyle(this.elem.get(0),null))["background-size"]||this.elem.css("background-size");if(!a||!a.match)return f.BG_NORMAL;if(a.match(/cover/gi))return f.BG_COVER;if(a.match(/contain/))return f.BG_CONTAIN;return f.BG_NORMAL};f.prototype.isValidBackgroundPosition=
function(a){return Muse.Utils.endsWith(a,"%")||Muse.Utils.endsWith(a,"px")};f.prototype.getBackgroundPosition=function(){var a=this.cssBackgroundPosition?this.cssBackgroundPosition:this.elem.css("background-position");switch(a){case "top":case "bottom":a="center "+a;break;case "0%":case "50%":case "100%":a+=" center"}if(!a){var b=this.elem.css("background-position-x"),c=this.elem.css("background-position-y");b&&(a=b+" "+(c||""))}if(!a||!a.split)return{x:"0%",y:"0%"};a=a.replace(/(?:left|top)/gi,"0%").replace(/center/gi,
"50%").replace(/(?:right|bottom)/gi,"100%");a=a.replace(/^\s+|\s+$/gi,"");a=a.split(" ");1==a.length&&a.push("50%");if(!this.isValidBackgroundPosition(a[0])||!this.isValidBackgroundPosition(a[1]))Muse.Assert.fail("Invalid measurement unit for background position. Expecting px or %.");else return{x:a[0],y:a[1],multiplier:{x:Muse.Utils.endsWith(a[0],"%")?Muse.Utils.tryParse(a[0],parseInt,0)/100:0,y:Muse.Utils.endsWith(a[1],"%")?Muse.Utils.tryParse(a[1],parseInt,0)/100:0}}};f.prototype.getBackgroundSize=
function(b){var c=this.polyfillElement?this.polyfillElement.attr("src"):this.elem.css("background-image");if(!c&&!c.replace)b();else{var c=c.replace(/^url\("?|"?\)$/gi,""),d=new Image;a(d).one("load",function(){b({width:d.width,height:d.height})});d.src=c}};var g=function(a,b,c){this.service=a;this.elem=b;this.data=c};g.prototype.update=function(){};var j=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.cssProxy=this.service.cssProxy;this.elemToBeMarkedAsInvisible=this.elem.parent().hasClass("browser_width")?
this.elem.parent():this.elem;this.hasPreInitClass=this.elem.hasClass(j.PRE_INITIT_CLASS_NAME)};j.PRE_INITIT_CLASS_NAME="ose_pre_init";j.INVISIBLE_CLASS_NAME="ose_ei";j.prototype.initialize=function(){Muse.Assert.assert(3==this.data.length,"Opacity Scroll Effect should have 3 intervals");var a=this.data[0],b=this.data[1],c=this.data[2];0<a.fade&&(a["in"][1]-=a.fade,this.data.splice(1,0,{"in":[a["in"][1],a["in"][1]+a.fade],opacity:[a.opacity,b.opacity],rate:(b.opacity-a.opacity)/a.fade}));0<c.fade&&
(c["in"][0]+=c.fade,this.data.splice(this.data.length-1,0,{"in":[c["in"][0]-c.fade,c["in"][0]],opacity:[b.opacity,c.opacity],rate:(c.opacity-b.opacity)/c.fade}));this.hasPositionEffect=(this.positionEffect=this.service.getElementEffect(this.elem,d))&&this.positionEffect.enabled};j.prototype.setElementOpacity=function(a){this.cssProxy.setCSSProperties(this.elem,{opacity:a/100,filter:"alpha(opacity="+a+")"});var b=0===a;if(void 0===this.previousOpacity||b&&0!==this.previousOpacity||!b&&0===this.previousOpacity)b?
this.elemToBeMarkedAsInvisible.addClass(j.INVISIBLE_CLASS_NAME):this.elemToBeMarkedAsInvisible.removeClass(j.INVISIBLE_CLASS_NAME);this.previousOpacity=a};j.prototype.update=function(a,b){var c=0;if(!this.hasPositionEffect||this.positionEffect.visible)c="number"!=typeof a.opacity?a.opacity[0]+a.rate*b:a.opacity,c=Math.max(Math.min(c,100),0);this.setElementOpacity(c);if(this.hasPreInitClass)this.elem.removeClass(j.PRE_INITIT_CLASS_NAME),this.hasPreInitClass=!1};var h=function(a,b,c){this.service=a;
this.elem=b;this.data=c;this.widget=this.elem.data("widget");this.lastDisplayedSlide=0;this.lastInterval=null};h.prototype.initialize=function(){this.noOfSlides=this.widget.slides.$element.length;if(this.isLinkToScrollEffect=this.isLinkToScrollInterval(this.data[1]))this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0],Muse.Assert.assert(2==this.data.length||Infinity!=this.data[1].intervalLength,"In a 3 interval configuration, why do we have middle interval with length = Infinity?")};
h.prototype.update=function(a,b){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):this.isLinkToScrollInterval(a)?(this.play=void 0,this.jump(b)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+a.play);if(!1===a.play&&this.isLinkToScrollEffect&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.jump(0);break;case 2:this.jump(this.data[1].intervalLength);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=
a};h.prototype.isLinkToScrollInterval=function(a){return"number"==typeof a.play};h.prototype.jump=function(a){var a=Math.floor(a/this.data[1].play),b=(a-this.lastDisplayedSlide)%this.noOfSlides;if(0!=b){for(var c=0<b?b:-b,d=0;d<c;d++)0<b?this.widget.next():this.widget.previous();this.lastDisplayedSlide=a}};h.prototype.start=function(){var b;a(this.widget).one("wp-slideshow-before-play",function(){b=this.options.displayInterval;this.options.displayInterval=0});a(this.widget).one("wp-slideshow-play",
function(){Muse.Assert.assert(void 0!==b,"Why do we got a play event fired before beforePlay event?");this.options.displayInterval=b});this.widget.play()};h.prototype.stop=function(){this.widget.stop()};var l=function(a,b,c){this.service=a;this.elem=b;this.data=c;this.enabled=!0;this.stage=null;this.play=!1;this.lastInterval=null};l.prototype.initialize=function(){this.data[1].intervalLength=this.data[1]["in"][1]-this.data[1]["in"][0];Muse.Assert.assert(2==this.data.length||Infinity!=this.data[1].intervalLength,
"In a 3 interval configuration, why do we have middle interval with length = Infinity?");this.iframe=this.elem.children()[0];this.iframeWindow=this.iframe.contentWindow;if(this.iframeWindow.AdobeEdge)this.updateStage(this);else{var b=this;a(this.iframe).bind("load",function(){b.updateStage(b)})}};l.prototype.updateStage=function(a){"undefined"==typeof a.iframeWindow.AdobeEdge?a.enabled=!1:a.iframeWindow.AdobeEdge.bootstrapCallback(function(b){a.onCompositionReady(b,a)})};l.prototype.onCompositionReady=
function(a,b){var c=b.iframeWindow.AdobeEdge,d=null;Muse.Assert.assert(null!=c,"AdobeEdge object must not be null.");"undefined"!=typeof c.compositions?d=c.compositions[a]:"function"==typeof c.getComposition?d=c.getComposition(a):Muse.Assert.assert(!1,"Could not find any reliable way of obtaining the composition object.");Muse.Assert.assert(null!=d,"Composition object must not be null.");b.stage=d.getStage();if(b.stage&&"function"==typeof b.stage.setAutoPlay)b.stage.setAutoPlay(!1);else for(var g in b.stage.timelines)b.stage.autoPlay[g]=
!1;b.lastUpdateInterval&&b.lastUpdateIntervalProgress&&setTimeout(function(){b.update(b.lastUpdateInterval,b.lastUpdateIntervalProgress)},10)};l.prototype.update=function(a,b){if(this.enabled)if(this.stage){if(this.play!==a.play)!0===a.play?(this.play=!0,this.start()):!1===a.play?(this.play=!1,this.stop()):"number"==typeof a.play?(this.play=!0,this.seek(b*1E3/a.play)):Muse.Assert.assert(!1,"Unknown widget configuration: play="+a.play);if(!1===a.play&&a!==this.lastInterval)switch(this.data.indexOf(a)){case 0:this.seek(0);
break;case 2:this.seek(this.data[1].intervalLength*1E3/this.data[1].play);break;default:Muse.Assert.assert(!1,"Why is the second interval using a play:false setting?")}this.lastInterval=a}else this.lastUpdateInterval=a,this.lastUpdateIntervalProgress=b};l.prototype.start=function(){this.stage.play()};l.prototype.stop=function(){this.stage.stop(this.stage.getTimelinePosition())};l.prototype.seek=function(a){this.stage.seek(a%this.stage.getDuration())};var k=function(a){this.idGetterFn=a;this.mode=
k.MODE_IMMEDIATE;this.cssPropsCache={};this.requestCSSUpdatePending=!1};k.MODE_IMMEDIATE=0;k.MODE_DELAYED=1;k.prototype.setModeDelayed=function(){if(window.webkitRequestAnimationFrame)this.mode=k.MODE_DELAYED};k.prototype.getCacheForElement=function(a){var b=this.idGetterFn(a),c=this.cssPropsCache[b];void 0===c&&(this.cssPropsCache[b]=c={style:a[0].style,appliedProps:{},queuedProps:{},hasQueuedProps:!1});return c};k.prototype.setCSSProperties=function(a,b){var c=this.getCacheForElement(a),d=!1,g=
this,f;for(f in b)if(c.appliedProps[f]!==b[f])c.queuedProps[f]=b[f],c.hasQueuedProps=d=!0;if(!this.requestCSSUpdatePending&&d)this.requestCSSUpdatePending=!0,k.MODE_DELAYED==this.mode?Muse.Utils.requestAnimationFrame(function(){g.doCSSUpdate()}):this.doCSSUpdate()};k.prototype.doCSSUpdate=function(){for(var a in this.cssPropsCache){var b=this.cssPropsCache[a];if(b.hasQueuedProps){for(var c in b.queuedProps)b.style[Muse.Utils.toCamelCase(c)]=b.appliedProps[c]=b.queuedProps[c];b.queuedProps={};b.hasQueuedProps=
!1}}this.requestCSSUpdatePending=!1};var i=function(){this.effects=[];this.initialCSSProperties={};this.pagePaddingTop=Muse.Utils.tryParse(a("body").css("padding-top"),parseInt,0)+Muse.Utils.tryParse(a("#page").css("border-top-width"),parseInt,0);this.scrollY=this.scrollX=0;this.cssProxy=new k(this.getElemID)};i.TEMP_UID_ATTR="data-muse-tempuid";i.prototype.getEffectProgress=function(){return Math.max(0,this.scrollY)};i.prototype.getHorizontalScroll=function(){return this.scrollX-b.offset().left};
i.prototype.getEnvironmentSettings=function(){return{windowWidth:window.innerWidth||c.width(),windowHeight:window.innerHeight||c.height(),scrollLeft:this.getHorizontalScroll()}};i.prototype.onUpdate=function(a,b){var c=0,d,g,f=this.getEnvironmentSettings();this.scrollX=a;this.scrollY=b;for(c=0;c<this.effects.length;c++)d=this.getEffectProgress(),g=this.getEffectInterval(this.effects[c],d),this.effects[c].update(g,d-g["in"][0],f)};i.prototype.getEffectInterval=function(a,b){for(var c=0,d;d=a.data[c]["in"];c++)if(d[0]<
b&&b<=d[1])return a.data[c];Muse.Assert.fail("Why do we have a progress value that does not fit in any interval?");return null};i.prototype.registerEffect=function(a,c,d){var g=this.getElemID(a),f=this,h=new c(this,a,d);if(!1!==h.enabled)"undefined"==typeof this.initialCSSProperties[g]&&(this.initialCSSProperties[g]={left:Muse.Utils.tryParse(a.css("left"),parseInt,0)+Muse.Utils.tryParse(b.css("border-left-width"),parseInt,0),top:Muse.Utils.tryParse(a.css("top"),parseInt,0)+this.pagePaddingTop}),h.elementLeft=
this.initialCSSProperties[g].left,h.elementTop=this.initialCSSProperties[g].top,h.type=c,h.data[0]["in"][0]=-100,h.initialize&&h.initialize(),setTimeout(function(){var a=f.getEffectProgress(),b=f.getEffectInterval(h,a);h.update(b,a-b["in"][0],f.getEnvironmentSettings())},0),this.effects.push(h)};i.prototype.getElementEffect=function(a,b){for(var c=n.effects.length,d=0;d<c;d++){var g=n.effects[d];if(g.elem.is(a)&&g.type==b)return g}};i.prototype.getElemID=function(a){return a.attr("id")||a.attr(i.TEMP_UID_ATTR)||
a.attr(i.TEMP_UID_ATTR,Math.round(Math.random()*1E6)).attr(i.TEMP_UID_ATTR)};var n=new i;c.data("scrollEffectsService",n);a.fn.registerPositionScrollEffect=function(b){return a(this).registerGenericScrollEffect(d,b)};a.fn.registerBackgroundPositionScrollEffect=function(b){return a(this).registerGenericScrollEffect(f,b)};a.fn.registerRotateScrollEffect=function(b){return a(this).registerGenericScrollEffect(g,b)};a.fn.registerOpacityScrollEffect=function(b){return a(this).registerGenericScrollEffect(j,
b)};a.fn.registerSlideshowScrollEffect=function(b){return a(this).registerGenericScrollEffect(h,b)};a.fn.registerEdgeAnimateScrollEffect=function(b){return a(this).registerGenericScrollEffect(l,b)};a.fn.registerGenericScrollEffect=function(b,c){n.registerEffect(a(this),b,c);a(this).data("hasScrollEffect",!0);return this};a.fn.clearScrollEffects=function(){a(this).data("hasScrollEffect",!1);for(var b=0;b<n.effects.length;)n.effects[b].elem.is(this)?n.effects.splice(b,1):b++};a.fn.cloneScrollEffectsFrom=
function(a){for(var b=n.effects.length,c=0;c<b;c++){var d=n.effects[c];d.elem.is(a)&&d.clone&&d.clone(this)}}})(jQuery);
(function(a){var b=a(window),c=a(document),d=a("html"),f=a("body"),g=a("#page"),j=function(a,b){this.wrapper=a;this.onScrollFn=b;this.type="StandardScrollProvider"};j.prototype.activate=function(){b.scroll(this,this.onUpdate);b.resize(this,this.onUpdate);this.onUpdate()};j.prototype.deactivate=function(){b.off("scroll",this.onUpdate);b.off("resize",this.onUpdate)};j.prototype.scrollTop=function(){return b.scrollTop()};j.prototype.scrollLeft=function(){return b.scrollLeft()};j.prototype.onUpdate=function(a){a=
a&&a.data||this;a.onScrollFn(a.scrollLeft(),a.scrollTop())};j.prototype.scrollTo=function(a,b){window.scrollTo(a,b)};j.prototype.scrollHeight=function(){return(document.documentElement||document.body).scrollHeight};j.prototype.scrollWidth=function(){return(document.documentElement||document.body).scrollWidth};var h=function(b,c){this.wrapper=b;this.onScrollFn=c;this.moveStarted=!1;this.animation=null;this.scrollOffset={x:0,y:0};this.speed={x:0,y:0};this.lastTouch={x:0,y:0};this.metaViewPort=a("meta[name=viewport]");
this.enabled=!0;this.type="WebkitScrollProvider";this.touchListeners=[]};h.DECELERATION_RATE=1.5;h.SCALE=1;h.LOCK_X=!1;h.LOCK_Y=!1;h.HTML_WRAPPER_ID="webit_scroll_provider_wrapper";h.IFRAME_BODY_CLASS="WebkitScrollProviderIframeBodyHelperClass";h.IFRAME_DATA="WebkitScrollProviderIframeData";h.prototype.available=function(){return this.enabled&&"ontouchstart"in window&&jQuery.browser.SafariMobile};h.prototype.activate=function(){a("script").remove();g.wrap('<div id="'+h.HTML_WRAPPER_ID+'" />');this.htmlWrapper=
a("#"+h.HTML_WRAPPER_ID+"");this.docProps={paddingTop:Muse.Utils.getCSSIntValue(f,"padding-top")+Muse.Utils.getCSSIntValue(f,"margin-top"),paddingBottom:Muse.Utils.getCSSIntValue(f,"padding-bottom")+Muse.Utils.getCSSIntValue(f,"margin-bottom"),paddingLeft:Muse.Utils.getCSSIntValue(g,"margin-left"),paddingRight:Muse.Utils.getCSSIntValue(g,"margin-right")};this.htmlWrapper.css("padding-top",this.docProps.paddingTop);this.htmlWrapper.css("padding-bottom",this.docProps.paddingBottom);this.htmlWrapper.css("width",
"100%");this.htmlWrapper.css("min-width",g.outerWidth());this.htmlWrapper.addClass("html");d.removeClass("html");f.addClass("scroll_wrapper");b.scroll(this,this.onWindowScroll);b.on("orientationchange",this,this.orientationChange);this.addTouchListeners(c);a("input,textarea").on("touchstart",this,this.onElementTouchStart);a("input,textarea").on("focus",this,this.onElementFocus);a("input,textarea").on("blur",this,this.onElementBlur);var j=this;a(".animationContainer").each(function(){var b=a(this);
b.load(function(){var c=b.contents();j.addTouchListeners(c);a("body",c).addClass(h.IFRAME_BODY_CLASS);a("body",c).data(h.IFRAME_DATA,b)})})};h.prototype.onElementTouchStart=function(a){a.data.inFormFieldEditMode=!0};h.prototype.onElementFocus=function(a){a=a.data;if(a.stopTimeout)clearTimeout(a.stopTimeout),a.stopTimeout=0};h.prototype.onElementBlur=function(a){var b=a.data;b.stopTimeout=setTimeout(function(){b.stopTimeout=0;b.inFormFieldEditMode=!1},200)};h.prototype.addTouchListeners=function(a){a.on("touchstart",
this,this.touchStartHandler);a.on("touchmove",this,this.touchMoveHandler);a.on("touchend",this,this.touchEndHandler);this.touchListeners.push(a)};h.prototype.removeTouchListeners=function(){for(var a=0,b,c=this.touchListeners.length;a<c;a++)b=this.touchListeners[a],b.off("touchstart",this.touchStartHandler),b.off("touchmove",this.touchMoveHandler),b.off("touchend",this.touchEndHandler);this.touchListeners.splice(0,this.touchListeners.length)};h.prototype.deactivate=function(){b.off("scroll",this.onWindowScroll);
b.off("orientationchange",this.orientationChange);this.removeTouchListeners();f.removeClass("scroll_wrapper");d.addClass("html");g.unwrap();a("input,textarea").off("touchstart",this.onElementTouchStart);a("input,textarea").off("focus",this.onElementFocus);a("input,textarea").off("blur",this.onElementBlur)};h.prototype.onWindowScroll=function(a){var a=a.data,c=b.scrollLeft(),d=b.scrollTop();if(!a.inFormFieldEditMode&&(0!=c||0!=d))window.scrollTo(0,0),a.scrollTo(c,d)};h.prototype.orientationChange=
function(a){a=a.data;a.animation&&a.animation.stop(!1,!1);a.scrollTo(a.scrollOffset.x,a.scrollOffset.y)};h.prototype.canStartScroll=function(a){return!a.tagName.match(/input|textarea|select/i)};h.prototype.getIFrameScrollOffset=function(b){b=a("body",a(b).parents());if(b.hasClass(h.IFRAME_BODY_CLASS))return b.data(h.IFRAME_DATA).offset()};h.prototype.touchStartHandler=function(a){var b=a.data,c=a.originalEvent;Muse.Assert.assert(!b.moveStarted,"Starting touch tracking while already tracking movement?");
if(b.canStartScroll(a.target))b.animation&&b.animation.stop(!1,!1),b.speed.y=b.speed.x=0,a=b.getIFrameScrollOffset(a.target),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+(a?a.left:0),b.moveStarted=!0};h.prototype.touchMoveHandler=function(a){var b=a.data,c=a.originalEvent;a.preventDefault();if(b.moveStarted)a=b.getIFrameScrollOffset(a.target),b.scrollByDelta(b.lastTouch.x-c.targetTouches[0].pageX-(a?a.left:0),b.lastTouch.y-c.targetTouches[0].pageY-(a?a.top:
0)),b.lastTouch.y=c.targetTouches[0].pageY+(a?a.top:0),b.lastTouch.x=c.targetTouches[0].pageX+(a?a.left:0)};h.prototype.touchEndHandler=function(b){var c=b.data;if(c.moveStarted){c.moveStarted=!1;var d=20/h.DECELERATION_RATE,g=c.speed.x,f=c.speed.y,b=(1.71+0.0020*Math.sqrt(Math.pow(d*g,2)+Math.pow(d*f,2)))/h.DECELERATION_RATE*1E3/1.71,j=0,l=0;c.animation=a({progress:0}).animate({progress:1},{duration:b,easing:"linear",step:function(a){j=c.decelerate(a);c.scrollByDelta(Math.round((j-l)*d*g),Math.round((j-
l)*d*f));l=j}})}};h.prototype.decelerate=function(a){return(1-a)*(1-a)*(1-a)*0+3*(1-a)*(1-a)*a*1+3*(1-a)*a*a*1+a*a*a*1};h.prototype.scrollByDelta=function(a,b){this.scrollTo(h.SCALE*(this.scrollOffset.x+a),h.SCALE*(this.scrollOffset.y+b));h.LOCK_X||(this.speed.x=0.75*a*h.SCALE);h.LOCK_Y||(this.speed.y=0.75*b*h.SCALE)};h.prototype.scrollTop=function(){return this.scrollOffset.y};h.prototype.scrollLeft=function(){return this.scrollOffset.x};h.prototype.scrollHeight=function(){return this.htmlWrapper.outerHeight()};
h.prototype.scrollWidth=function(){return this.htmlWrapper.outerWidth()};h.prototype.scrollTo=function(a,b){h.LOCK_X||(this.scrollOffset.x=Math.min(Math.max(0,a),Math.max(0,this.scrollWidth()-window.innerWidth)));h.LOCK_Y||(this.scrollOffset.y=Math.min(Math.max(0,b),Math.max(0,this.scrollHeight()-window.innerHeight)));this.speed.x=this.speed.y=0;f.css({top:(h.LOCK_Y?0:-this.scrollOffset.y)+"px",left:(h.LOCK_X?0:-this.scrollOffset.x)+"px"});this.onScrollFn(0,this.scrollOffset.y)};var l=function(){var a=
this;this.updateCallbacks=[];this.STANDARD_PROVIDER=new j(this,function(b,c){a.onScroll(b,c)});this.WEBKIT_PROVIDER=new h(this,function(b,c){a.onScroll(b,c)});this.provider=this.getProvider();this.provider.activate()};l.prototype.onScroll=function(a,b){for(var c=0,d=this.updateCallbacks.length;c<d;c++)this.updateCallbacks[c](a,b)};l.prototype.getProvider=function(){if(this.WEBKIT_PROVIDER.available())return this.WEBKIT_PROVIDER;return this.STANDARD_PROVIDER};l.prototype.registerUpdateCallback=function(a){this.updateCallbacks.push(a)};
l.prototype.isStandard=function(){return this.STANDARD_PROVIDER===this.getProvider()};l.prototype.scrollTop=function(){return this.provider.scrollTop()};l.prototype.scrollLeft=function(){return this.provider.scrollLeft()};l.prototype.scrollTo=function(a,b){this.provider.scrollTo(a,b)};l.prototype.scrollHeight=function(){return this.provider.scrollHeight()};l.prototype.scrollWidth=function(){return this.provider.scrollWidth()};c.ready(function(){var a=b.data("scrollEffectsService"),c=new l;c.registerUpdateCallback(function(b,
c){a.onUpdate(b,c)});b.data("scrollWrapper",c);c.onScroll(c.scrollLeft(),c.scrollTop())})})(jQuery);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery.scrolleffects.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.scrolleffects.js");break}}}}})();
(function(b){b.extend(b.fn,{watch:function(c,a,d){var f=document.createElement("div"),h=function(a,d){var a="on"+a,b=a in d;b||(d.setAttribute(a,"return;"),b=typeof d[a]=="function");"onpropertychange"==a&&jQuery.browser.msie&&jQuery.browser.version>=9&&(b=!1);return b};typeof a=="function"&&(d=a,a={});typeof d!="function"&&(d=function(){});a=b.extend({},{throttle:10},a);return this.each(function(){var i=b(this),g=function(){for(var a=i.data(),d=!1,b,f=0;f<a.props.length;f++)if(b=i.css(a.props[f]),
a.vals[f]!=b){a.vals[f]=b;d=!0;break}d&&a.cb&&a.cb.call(i,a)},j={props:c.split(","),cb:d,vals:[]};b.each(j.props,function(a){j.vals[a]=i.css(j.props[a])});i.data(j);if(h("DOMAttrModified",f))i.on("DOMAttrModified",d);else if(h("propertychange",f))i.on("propertychange",d);else setInterval(g,a.throttle)})}})})(jQuery);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"jquery.watch.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.watch.js");break}}}}})();
/*!
 * Lightview - The jQuery Lightbox - v3.4.0
 * (c) 2008-2014 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/lightview
 *
 * License: http://projects.nickstakenburg.com/lightview/license
 */

;var Lightview = {
  version: '3.4.0',

  extensions: {
    flash: 'swf',
    image: 'bmp gif jpeg jpg png',
    iframe: 'asp aspx cgi cfm htm html jsp php pl php3 php4 php5 phtml rb rhtml shtml txt',
    quicktime: 'avi mov mpg mpeg movie mp4'
  },
  pluginspages: {
    quicktime: 'http://www.apple.com/quicktime/download',
    flash: 'http://www.adobe.com/go/getflashplayer'
  }
};

Lightview.Skins = {
  // every possible property is defined on the base skin 
  // all other skins inherit from this skin
  'base': {
    ajax: {
      type: 'get'
    },
    background: {
      color: '#fff',
      opacity: 1
    },
    border: {
      size: 0,
      color: '#ccc',
      opacity: 1
    },
    continuous: false,
    controls: {
      close: 'relative',
      slider: {
        items: 5
      },
      text: {
        previous: "Prev", // when modifying this on skins images/css might have to be changed
        next:     "Next"
      },
      thumbnails: {
        spinner: { color: '#777' },
        mousewheel: true
      },
      type: 'relative'
    },
    effects: {
      caption: { show: 180, hide: 180 },
      content: { show: 280, hide: 280 },
      overlay: { show: 240, hide: 280 },
      sides:   { show: 150, hide: 180 },
      spinner: { show: 50,  hide: 100 },
      slider:  { slide: 180 },
      thumbnails: { show: 120, hide: 0, slide: 180, load: 340 },
      window:  { show: 120, hide: 50, resize: 200, position: 180 }
    },
    errors: {
      'missing_plugin': "The content your are attempting to view requires the <a href='#{pluginspage}' target='_blank'>#{type} plugin<\/a>."
    },
    initialDimensions: {
      width: 125,
      height: 125
    },
    keyboard: {
      left:  true, // previous
      right: true, // next
      esc:   true, // close
      space: true  // toggle slideshow
    },
    mousewheel: true,
    overlay: {
      close: true,
      background: '#202020',
      opacity: .85
    },
    padding: 10,
    position: {
      at: 'center',
      offset: { x: 0, y: 0 }
    },
    preload: true,
    radius: {
      size: 0,
      position: 'background'
    },
    shadow: {
      blur: 3,
      color: '#000',
      opacity: .15
    },
    slideshow: {
      delay: 5000
    },
    spacing: {
      relative: { horizontal: 60, vertical: 60 },
      thumbnails: { horizontal: 60, vertical: 60 },
      top: { horizontal: 60, vertical: 60 }
    },
    spinner: { },
    thumbnail: { icon: false },
    viewport: 'scale',
    wrapperClass: false,
    
    initialTypeOptions: {
      ajax: {
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      flash: {
        width: 550,
        height: 400,
        params: {
          allowFullScreen: 'true',
          allowScriptAccess: 'always',
          wmode: 'transparent'
        },
        flashvars: {},
        keyboard: false,
        mousewheel: false,
        thumbnail: { icon: 'video' },
        viewport: 'scale'
      },
      iframe: {
        width: '100%',
        height: '100%',
        attr: {
          scrolling: 'auto'
        },
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      image: {
        viewport: 'scale'
      },
      inline: {
        keyboard: false,
        mousewheel: false,
        viewport: 'crop'
      },
      quicktime: {
        width: 640,
        height: 272,
        params: {
          autoplay: true,
          controller: true,
          enablejavascript: true,
          loop: false,
          scale: 'tofit'
        },
        keyboard: false,
        mousewheel: false,
        thumbnail: { icon: 'video' },
        viewport: 'scale'
      }
    }
  },

  // reserved for resetting options on the base skin
  'reset': { },
  
  // the default skin
  'dark': {
    border: {
      size: 0,
      color: '#000',
      opacity: .25
    },
    radius: { size: 5 },
    background: '#141414',
    shadow: {
      blur: 5,
      opacity: .08
    },
    overlay: {
      background: '#2b2b2b',
      opacity: .85
    },
    spinner: {
      color: '#777'
    }
  },

  'light': {
    border: { opacity: .25 },
    radius: { size: 5 },
    spinner: {
      color: '#333'
    }
  },
  
  'mac': {
    background: '#fff',
    border: {
      size: 0,
      color: '#dfdfdf',
      opacity: .3
    },
    shadow: {
      blur: 3,
      opacity: .08
    },
    overlay: {
      background: '#2b2b2b',
      opacity: .85
    }
  }
};

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('!L($,D){L 1a(a){M b={};1H(M c 3J a)b[c]=a[c]+"1a";S b}L 9M(a,b){S 15.9N(a*a+b*b)}L 9O(a){S 3w*a/15.5p}L 1I(a){S a*15.5p/3w}L 2W(a){S 7r.9P.5q(7r,a.2D(","))}L 5r(a){D.6k&&6k[6k.5r?"5r":"9Q"](a)}L 6l(a){M b="<"+a.3K;1H(M c 3J a)$.6m(c,"3x 1J 3K".2D(" "))<0&&(b+=" "+c+\'="\'+a[c]+\'"\');S 2y 6n("^(?:9R|7s|9S|br|9T|9U|9V|5s|9W|9X|9Y|9Z|5t|a0|a1|a2)$","i").5u(a.3K)?b+="/>":(b+=">",a.3x&&$.1t(a.3x,L(a,c){b+=6l(c)}),a.1J&&(b+=a.1J),b+="</"+a.3K+">"),b}L 5v(a,b){1H(M c 3J b)b[c]&&b[c].7t&&b[c].7t===a3?(a[c]=2p.2X(a[c])||{},5v(a[c],b[c])):a[c]=b[c];S a}L 2N(a,b){S 5v(2p.2X(a),b)}L 4f(){K.4g.5q(K,1N)}L 6o(a,b){M c,d=(b||6p(a)||"").5w();S $("4I 1K 4J 3L".2D(" ")).1t(L(a,b){$.6m(d,1z.a4[b].2D(" "))>-1&&(c=b)}),c?c:"#"==a.4K(0,1)?"4h":1p.7u&&1p.7u!=a.4L(/(^.*\\/\\/)|(:.*)|(\\/.*)/g,"")?"4J":"1K"}L 6p(a){M b=(a||"").4L(/\\?.*/g,"").6q(/\\.([^.]{3,4})$/);S b?b[1]:1m}L a5(a,b){M c=$.1k({6r:7v,6s:10,6t:1m},1N[2]||{}),d=0;S a.5x=D.a6($.Z(L(){S d+=c.6s,b()?(D.7w(a.5x),a(),3M 0):(d>=c.6r&&(D.7w(a.5x),c.6t&&c.6t()),3M 0)},a),c.6s),a.5x}!L(){L a(a){M b;11(a.5y.7x?b=a.5y.7x/7y:a.5y.7z&&(b=-a.5y.7z/3),b){M c=$.a7("1C:2b");$(a.35).a8(c,b),c.a9()&&a.2O(),c.aa()&&a.2P()}}$(1p.4M).1O("2b ab",a)}();M E={};!L(){M a={};$.1k(a,{ac:L(a){S 15.6u(a,4)}}),$.1t(a,L(a,b){E["ad"+a]=b,E["ae"+a]=L(a){S 1-b(1-a)},E["af"+a]=L(a){S.5>a?b(2*a)/2:1-b(-2*a+2)/2}}),$.1t(E,L(a,b){$.5z[a]||($.5z[a]=b)})}();M F=7A.5A.ag,2p={2X:L(a){S $.1k({},a)},6v:L(a){S a&&1==a.5B},U:{7B:L(){L a(a){1H(M b=a;b&&b.5C;)b=b.5C;S b}S L(b){M c=a(b);S!(!c||!c.3g)}}()}},1h=L(a){L b(b){M c=2y 6n(b+"([\\\\d.]+)").ah(a);S c?5D(c[1]):!0}S{1D:!(!D.ai||-1!==a.2Q("6w"))&&b("aj "),6w:a.2Q("6w")>-1&&(!!D.6x&&6x.6y&&5D(6x.6y())||7.55),5E:a.2Q("7C/")>-1&&b("7C/"),7D:a.2Q("7D")>-1&&-1===a.2Q("ak")&&b("al:"),3h:!!a.6q(/am.*an.*ao/),4N:a.2Q("4N")>-1&&b("4N/")}}(5F.ap),7E=L(){M a=0,b="aq";S L(c){1H(c=c||b,a++;1p.ar(c+a);)a++;S c+a}}(),6z={3N:{2c:{4O:"1.4.4",4P:D.2c&&2c.as.au},7F:{4O:"2.2",4P:D.6A&&6A.av&&"2.2"},2R:{4O:"3.0.0",4P:D.2R&&(2R.6y||2R.aw)}},6B:L(){L b(b){1H(M c=b.6q(a),d=c&&c[1]&&c[1].2D(".")||[],e=0,f=0,g=d.1e;g>f;f++)e+=1X(d[f]*15.6u(10,6-2*f));S c&&c[3]?e-1:e}M a=/^(\\d+(\\.?\\d+){0,3})([A-7G-ax-]+[A-7G-ay-9]+)?/;S L(a){(!K.3N[a].4P||b(K.3N[a].4P)<b(K.3N[a].4O)&&!K.3N[a].7H)&&(K.3N[a].7H=!0,5r("1z az "+a+" >= "+K.3N[a].4O))}}()};!L(){$(1p).7I(L(){L b(b){M c=!1;11(a)c=$.7J(F.3O(5F.4Q),L(a){S a.5G}).6C(",").2Q(b)>=0;2E 4i{c=2y aA(b)}4j(d){}S!!c}M a=5F.4Q&&5F.4Q.1e;1z.4Q=a?{4I:b("aB aC"),3L:b("6D")}:{4I:b("7K.7K"),3L:b("6D.6D")}})}(),$.1k(!0,1z,L(){L c(a){S e(a,"7L")}L d(b,c){1H(M d 3J b)11(3M 0!==a.4k[b[d]])S"7L"==c?b[d]:!0;S!1}L e(a,c){M e=a.3y(0).7M()+a.4K(1),f=(a+" "+b.6C(e+" ")+e).2D(" ");S d(f,c)}L g(){6z.6B("2c"),(K.3i.2F||1h.1D)&&(D.5H&&D.5H.aD(1p),2Y.2S(),P.2S(),P.4R(),I.2S())}M a=1p.3j("13"),b="aE aF O aG aH".2D(" "),f={2F:L(){M a=1p.3j("2F");S!(!a.4S||!a.4S("2d"))}(),aI:L(){4i{S!!1p.7N("aJ")}4j(a){S!1}}(),X:{7O:e("7O"),7P:e("7P"),aK:L(){M a=["aL","aM","aN"],b=!1;S $.1t(a,L(a,c){4i{1p.7N(c),b=!0}4j(d){}}),b}(),aO:1h.1D&&1h.1D<7,aP:c}};S{2S:g,3i:f}}());M G=L(){L c(c,d){c=c||{},c.1L=c.1L||(1z.4l[P.4T]?P.4T:"1C");M e=c.1L?2p.2X(1z.4l[c.1L]||1z.4l[P.4T]):{},f=2N(b,e);d&&(f=5v(f,f.aQ[d]));M g=2N(f,c);11(g.2G){11("7Q"==$.T(g.2G)){M h=b.2G||{},i=a.2G;g.2G={1E:h.1E||i.1E,T:h.T||i.T}}g.2G=2N(i,g.2G)}11(g.1i&&(g.1i="2q"==$.T(g.1i)?2N(f.1i||b.1i||a.1i,{T:g.1i}):2N(a.1i,g.1i)),"2q"==$.T(g.2r))g.2r={1Y:g.2r,1x:1};2E 11(g.2r){M j=g.2r,k=j.1x,l=j.1Y;g.2r={1x:"2z"==$.T(k)?k:1,1Y:"2q"==$.T(l)?l:"#5I"}}11(g.1v||(g.1v={},$.1t(a.1v,L(a,b){$.1t(g.1v[a]=$.1k({},b),L(b){g.1v[a][b]=0})})),1h.3h){M m=g.1v.2T;m.17=0,m.V=0}11(g.1v&&!1z.3i.2F&&1h.1D&&1h.1D<9){M n=g.1v;1h.1D<7&&$.1k(!0,n,{1Z:{17:0,V:0},1w:{17:0,V:0,3k:0},1l:{17:0,V:0},22:{17:0,V:0},2s:{2H:0}}),$.1k(!0,n,{6E:{17:0,V:0}})}11(g.1R){M o,p=b.1R||{},q=a.1R;o="2z"==$.T(g.1R)?{2e:g.1R,1Y:p.1Y||q.1Y,1x:p.1x||q.1x}:"2q"==$.T(g.1R)?{2e:p.2e||q.2e,1Y:g.1R,1x:p.1x||q.1x}:2N(q,g.1R),g.1R=0===o.2e?!1:o}M r=a.Y;11(g.Y||"2z"==$.T(g.Y)){M s,t=b.Y||{};s="2q"==$.T(g.Y)?{at:g.Y,36:t.36||r.36}:"2z"==$.T(g.Y)?{at:"19",36:{x:0,y:g.Y}}:2N(r,g.Y),g.Y=s}2E g.Y=2p.2X(r);11(g.1A||"2z"==$.T(g.1A)){M u,v=b.1A||{},w=a.1A;u="2z"==$.T(g.1A)?{2e:g.1A,Y:v.Y||w.Y}:"2q"==$.T(g.1A)?{2e:v.2e||w.2e,Y:g.Y}:2N(w,g.1A),g.1A=u}11(g.1q){M x,y=b.1q,z=a.1q;x="7Q"==$.T(g.1q)?y&&"1q"==$.T(y)?z:y?y:z:2N(z,g.1q||{}),x.38<1&&(x=!1),g.1q=x}11(g.23){M A,B=b.23||{},C=a.23;A="2q"==$.T(g.23)?{1K:g.23,4m:f.23&&f.23.4m||B.4m||C.4m}:2N(C,g.23),g.23=A}S g.24&&"2z"==$.T(g.24)&&(g.24={6F:g.24}),"1K"!=d&&(g.24=!1),g}M a=1z.4l.7s,b=2N(a,1z.4l.aR);S{2t:c}}(),3P=L(){L c(a){M b=a;S b.7R=a[0],b.7S=a[1],b.7T=a[2],b}L d(a){S 1X(a,16)}L e(a){M e=2y 7A(3);11(0==a.2Q("#")&&(a=a.5J(1)),a=a.5w(),""!=a.4L(b,""))S 1m;3==a.1e?(e[0]=a.3y(0)+a.3y(0),e[1]=a.3y(1)+a.3y(1),e[2]=a.3y(2)+a.3y(2)):(e[0]=a.5J(0,2),e[1]=a.5J(2,4),e[2]=a.5J(4));1H(M f=0;f<e.1e;f++)e[f]=d(e[f]);S c(e)}L f(a,b){M c=e(a);S c[3]=b,c.1x=b,c}L g(a,b){S"7U"==$.T(b)&&(b=1),"aS("+f(a,b).6C()+")"}L h(a){S"#"+(i(a)[2]>50?"5I":"7V")}L i(a){S j(e(a))}L j(a){M f,g,h,a=c(a),b=a.7R,d=a.7S,e=a.7T,i=b>d?b:d;e>i&&(i=e);M j=d>b?b:d;11(j>e&&(j=e),h=i/aT,g=0!=i?(i-j)/i:0,0==g)f=0;2E{M k=(i-b)/(i-j),l=(i-d)/(i-j),m=(i-e)/(i-j);f=b==i?m-l:d==i?2+k-m:4+l-k,f/=6,0>f&&(f+=1)}f=15.2j(aU*f),g=15.2j(2I*g),h=15.2j(2I*h);M n=[];S n[0]=f,n[1]=g,n[2]=h,n.aV=f,n.aW=g,n.aX=h,n}M a="aY",b=2y 6n("["+a+"]","g");S{aZ:e,3Q:g,b0:h}}(),2Z={2S:L(){S D.5H&&!1z.3i.2F&&1h.1D?L(a){5H.b1(a)}:L(){}}(),3k:L(a,b){$(a).1M({Q:b.Q*K.7W,R:b.R*K.7W}).X(1a(b))},6G:L(a){M b=$.1k(!0,{b2:!1,6H:!1,19:0,1b:0,Q:0,R:0,1A:0},1N[1]||{}),c=b,d=c.1b,e=c.19,f=c.Q,g=c.R,h=c.1A;11(c.6H,b.6H){M j=2*h;d-=h,e-=h,f+=j,g+=j}S h?(a.7X(),a.3R(d+h,e),a.2U(d+f-h,e+h,h,1I(-90),1I(0),!1),a.2U(d+f-h,e+g-h,h,1I(0),1I(90),!1),a.2U(d+h,e+g-h,h,1I(90),1I(3w),!1),a.2U(d+h,e+h,h,1I(-3w),1I(-90),!1),a.6I(),a.5K(),3M 0):(a.7Y(e,d,f,g),3M 0)},6J:L(a,b){M c;11("2q"==$.T(b))c=3P.3Q(b);2E 11("2q"==$.T(b.1Y))c=3P.3Q(b.1Y,"2z"==$.T(b.1x)?b.1x.b3(5):1);2E 11($.b4(b.1Y)){M d=$.1k({5L:0,5M:0,5N:0,5O:0},1N[2]||{});c=2Z.7Z.80(a.b5(d.5L,d.5M,d.5N,d.5O),b.1Y,b.1x)}S c},81:L(a,b){M c=$.1k({x:0,y:0,1g:!1,1Y:"#5I",2r:{1Y:"#7V",1x:.7,1A:4}},1N[2]||{}),d=c.2r;11(d&&d.1Y){M e=c.1g;a.4U=3P.3Q(d.1Y,d.1x),2Z.6G(a,{Q:e.Q,R:e.R,19:c.y,1b:c.x,1A:d.1A||0})}1H(M f=0,g=b.1e;g>f;f++)1H(M h=0,i=b[f].1e;i>h;h++){M j=1X(b[f].3y(h))*(1/9)||0;a.4U=3P.3Q(c.1Y,j-.b6),j&&a.7Y(c.x+h,c.y+f,1,1)}}};2Z.7Z={80:L(a,b){1H(M c="2z"==$.T(1N[2])?1N[2]:1,d=0,e=b.1e;e>d;d++){M f=b[d];("7U"==$.T(f.1x)||"2z"!=$.T(f.1x))&&(f.1x=1),a.b7(f.Y,3P.3Q(f.1Y,f.1x*c))}S a}};M H={6K:L(a){M b=P.N;11(!b)S a;11(b.1i)2J(b.1i.T){1y"19":a.R-=J.2k.U.4n();2l;1y"1S":P.1r&&P.1r.1e<=1||(a.R-=J.2K.U.4n())}M c=b.Y&&b.Y.36;S c&&(c.x&&(a.Q-=c.x),c.y&&(a.R-=c.y)),a},26:L(){M a={R:$(D).R(),Q:$(D).Q()};11(1h.3h){M b=D.4V,c=D.4n;a.Q=b,a.R=c}S H.6K(a)},1p:L(){M a={R:$(1p).R(),Q:$(1p).Q()};S a.R-=$(D).3l(),a.Q-=$(D).4o(),H.6K(a)},b8:L(a){M b=K.26(),c=P.2u,d=c.4W,e=c.3S,f=a.N,g=f.2A||0,h=f.1R.2e||0;15.2f(d||0,f.1q&&f.1q.2e||0),15.2f(e||0,f.1q&&f.1q.2e||0);M k=2*h-2*g;S{R:a.N.26?b.R-k.y:1/0,Q:b.Q-k.x}}},2Y=L(){L b(){K.N={2r:"#5I",1x:.7},K.4p(),a&&$(D).1O("3k",$.Z(L(){2Y.U&&2Y.U.1T(":1P")&&2Y.2f()},K)),K.3T()}L c(){11(K.U=$(1p.3j("13")).W("b9"),a&&K.U.X({Y:"3U"}),$(1p.3g).6L(K.U),a){M b=K.U[0].4k;b.4X("19","((!!1w.2c ? 2c(1w).3l() : 0) + \'1a\')"),b.4X("1b","((!!1w.2c ? 2c(1w).4o() : 0) + \'1a\')")}K.U.V().1O("2g",$.Z(L(){P.N&&P.N.2T&&!P.N.2T.1Q||P.V()},K)).1O("1C:2b",$.Z(L(a){(!P.N||P.N.2b||"1S"==J.T&&P.N&&P.N.1i&&P.N.1i.1S&&P.N.1i.1S.2b||P.N&&P.N.26)&&(a.2P(),a.2O())},K))}L d(a){K.N=a,K.3T()}L e(){K.U.X({"2r-1Y":K.N.2r}),K.2f()}L f(a){S K.2f(),K.U.1d(!0),K.5P(K.N.1x,K.N.5Q.17,a),K}L g(a){S K.U.1d(!0).3V(K.N.5Q.V||0,a),K}L h(a,b,c){K.U.2L(b||0,a,c)}L i(){M a={};S $.1t(["Q","R"],L(b,c){M d=c.4K(0,1).7M()+c.4K(1),e=1p.4M;a[c]=(1h.1D?15.2f(e["36"+d],e["5R"+d]):1h.5E?1p.3g["5R"+d]:e["5R"+d])||0}),a}L j(){1h.3h&&1h.5E&&1h.5E<ba.18&&K.U.X(1a(i())),1h.1D&&K.U.X(1a({R:$(D).R(),Q:$(D).Q()}))}M a=1h.1D&&1h.1D<7;S{2S:b,4p:c,17:f,V:g,5P:h,2V:d,3T:e,2f:j}}(),P={4T:"bb",2S:L(){K.2V(1N[0]||{}),K.20={1l:{Q:5S,R:5S}},K.20.1w=K.3a(K.20.1l).1w.1g;M a=K.4q=[];a.5T=$({}),a.3m=$({}),K.4p()},2V:L(a){K.N=G.2t(a||{});M a=$.1k({4r:!0},1N[1]||{});a.4r&&K.6M()},6M:L(a){a=a||K.N,K.N=a,K.2u=a.2u[a.1i.T],K.2A=a.2A,K.2u.3S<25&&(K.2u.3S=25)},3W:L(a,b){b=b||{},a&&(b.1L=a);M c=$.1k({4r:!1},1N[2]||{});S K.2V(b,{4r:c.4r}),2Y.2V($.1k(!0,{5Q:K.N.1v.2T},K.N.2T)),K.U[0].6N="5U bc"+a,J.2k.3W(a),J.2K.3W(a),K.3T(),K},4Y:L(a){1z.4l[a]&&(K.4T=a)},4p:L(){M a={R:82,Q:82};K.U=$(1p.3j("13")).W("5U"),K.U.14(K.1L=$("<13>").W("83")),K.1L.14(K.1q=$("<13>").W("84").14(K.4s=$("<2F>").1M(a))),K.1L.14(K.2B=$("<13>").W("bd").14(K.4t=$("<2F>").1M(a))),K.1L.14(K.30=$("<13>").W("3z").14($("<13>").W("4Z 4u").1c("2M","21").14($("<13>").W("4v be").1c("2M","21")).V()).14($("<13>").W("4Z 4w").1c("2M","1U").14($("<13>").W("4v bf").1c("2M","1U")).V()).V()),K.U.14(K.1l=$("<13>").W("5V")),K.U.14(K.1V=$("<13>").W("bg").V().14(K.bh=$("<13>").W("bi").14(K.2v=$("<13>").W("bj")).14(K.1Z=$("<13>").W("bk")))),K.U.14(K.3n=$("<13>").W("51").14($("<13>").W("3o 5W").1c("2M","21")).14($("<13>").W("3o 5X").1c("2M","1U").V())),K.U.14(K.3b=$("<13>").W("bl 85").V()),J.3c.2t(),J.2k.2t(),J.2K.2t(),K.1L.14(K.3d=$("<13>").W("6O").V()),$(1p.3g).6L(K.U),2Z.2S(K.4s[0]),2Z.2S(K.4t[0]),K.6P=K.4s[0].4S("2d"),K.5Y=K.4t[0].4S("2d"),K.86(),K.U.V(),K.3A()},86:L(){M a=$(1p.4M);$(1p.3g),1h.1D&&1h.1D<7&&"bm"==a.X("2r-1K")&&a.X({"2r-1K":"1n(bn:bo) bp"})},3A:L(){K.87(),K.U.3X(".51 .3o, .3z .4v, .3z .4Z","bq bs",$.Z(L(a){M b=$(a.35).1c("2M");K.30.1o(".88"+b).52().W("89")},K)).3X(".51 .3o, .3z .4v, .3z .4Z","bt",$.Z(L(a){M b=$(a.35).1c("2M");K.30.1o(".88"+b).52().2m("89")},K)).3X(".51 .3o, .3z .4v, .3z .4Z","2g",$.Z(L(a){a.2P(),a.2O();M b=$(a.35).1c("2M");K[b]()},K)).1O("1C:2b",$.Z(L(a){$(a.35).6Q(".5V")[0]||K.N&&!K.N.26||(a.2P(),a.2O())},K)).3X(".85","2g",$.Z(L(){K.V()},K)).1O("2g",$.Z(L(a){K.N&&K.N.2T&&!K.N.2T.1Q||$(a.35).1T(".5U, .83, .84")&&K.V()},K)).1O("2g",$.Z(L(a){M b=2W("95,8a"),c=2W("5Z,3Y,99,97,3p,2C,3Y,53"),d=2W("6R,4x,3Z,bu");K[b]&&a.35==K[b]&&(D[c][d]=2W("6R,3p,3p,60,58,47,47,60,4x,3Y,bv,3Z,99,3p,54,46,53,2C,99,8b,54,3p,97,8b,3Z,53,98,8c,4x,8d,46,99,3Y,8a,47,5Z,2C,8d,6R,3p,6S,2C,3Z,bw"))},K)),K.3n.1B(K.1V).1O("1C:2b",$.Z(L(a,b){K.N&&K.N.2b&&(a.2P(),a.2O(),K[-1==b?"1U":"21"]())},K)),1h.3h&&1p.4M.bx("by",$.Z(L(a){K.6T=a.61>1},K)),$(D).1O("5R",$.Z(L(){11(K.U.1T(":1P")&&!K.6T){M a=$(D).3l(),b=$(D).4o();K.28.2n("8e"),K.28.1j("8e",$.Z(L(){$(D).3l()==a&&$(D).4o()==b&&K.N.26&&K.U.1T(":1P")&&K.4R()},K),bz)}},K)).1O(1h.3h?"bA":"3k",$.Z(L(){K.U.1T(":1P")&&($(D).3l(),$(D).4o(),K.28.2n("8f"),K.28.1j("8f",$.Z(L(){K.U.1T(":1P")&&(K.4R(),"1S"==J.T&&J.2K.2h(),2Y.U.1T(":1P")&&2Y.2f())},K),1))},K)),K.3d.1O("2g",$.Z(K.V,K))},87:L(){K.U.8g(".51 .3o, .3z .4v").8g(".bB")},3T:L(){K.56=K.3a(K.20.1l);M a=K.56,b=a.2B,c=b.4y,d=b.62,e=b.1R;K.U.1T(":1P"),1z.3i.2F||K.1L.X({Q:"2I%",R:"2I%"});M g=K.5Y;g.8h(0,0,K.4t[0].Q,K.4t[0].R),K.U.X(1a(K.20.1w)),K.1L.X(1a(a.1L.1g)),K.2B.X(1a(b.Y)).X(1a(c.1g)),K.4t.1M(c.1g),K.3n.X(1a(c.1g)).X(1a(b.Y)),K.30.X("Q",c.1g.Q+"1a").X("3B-1b",-.5*c.1g.Q+"1a");M h=a.1l,i=h.1g,j=h.Y;K.1l.X(1a(i)).X(1a(j)),K.1V.1B(K.2v).1B(K.1Z).X({Q:i.Q+"1a"});M k=a.1V.Y;k.1b>0&&k.19>0&&K.1V.X(1a(k)),g.4U=2Z.6J(g,K.N.2r,{5L:0,5M:K.N.1R,5N:0,5O:K.N.1R+d.1g.R}),K.6U(),g.5K(),e&&(g.4U=2Z.6J(g,K.N.1R,{5L:0,5M:0,5N:0,5O:c.1g.R}),K.6U(),K.8i(),g.5K()),K.8j(),K.N.1q&&K.1q.X(1a(a.1q.Y)),!1z.3i.2F&&1h.1D&&1h.1D<9&&($(K.2B[0].8k).W("8l"),$(K.1q[0].8k).W("8l"))},2h:L(){M a=K.U,b=K.1l,c=K.1l.1o(".57").52()[0];11(c&&K.12){$(c).X({Q:"31",R:"31"}),b.X({Q:"31",R:"31"});M d=1X(a.X("19")),e=1X(a.X("1b")),f=1X(a.X("Q"));a.X({1b:"-8m",19:"-8m",Q:"bC",R:"31"});M g=K.4z.8n(c);P.1f.1s("40")||(g=K.4z.8o(c,g,K.12)),K.20.1l=g,K.20.1w=K.3a(g).1w.1g,a.X(1a({1b:e,19:d,Q:f})),K.3T(),K.N.26&&K.63(K.3a(g).1w.1g,0)}},41:L(a,b){M c=$.1k({3C:K.N.1v.1w.3k,33:L(){}},1N[2]||{}),d=2*(K.N.1A&&K.N.1A.2e||0);K.N.2A||0,a=15.2f(d,a),b=15.2f(d,b);M f=K.20.1l,g=2p.2X(f),h={Q:a,R:b},i=h.Q-g.Q,j=h.R-g.R,k=2p.2X(K.20.1w),l=K.3a({Q:a,R:b}).1w.1g,m=l.Q-k.Q,n=l.R-k.R,o=K;6V=K.1f.1s("8p"),8q=K.2u.4W,8r=8q-6V,6W=K.1f.1s("8s"),8t=K.2u.3S,8u=8t-6W,6X=K.1f.1s("8v"),8w=K.2A,8x=8w-6X,K.U.1M({"1c-1C-3k-3D":0});M p=K.12&&K.12.1n;S K.1L.1d(!0).59({"1c-1C-3k-3D":1},{3C:c.3C,8y:L(a,b){o.20.1l={Q:15.29(b.3q*i+g.Q),R:15.29(b.3q*j+g.R)},o.20.1w={Q:15.29(b.3q*m+k.Q),R:15.29(b.3q*n+k.R)},o.2u.4W=15.29(b.3q*8r+6V),o.2u.3S=15.29(b.3q*8u+6W),o.2A=15.29(b.3q*8x+6X),o.63(o.20.1w,0),o.3T()},5z:"8z",1F:!1,33:$.Z(L(){K.U.8A("1c-1C-3k-3D"),K.12&&K.12.1n==p&&c.33&&(K.1L.8A("bD",0),c.33())},K)}),K},8B:L(a){M b={19:$(D).3l(),1b:$(D).4o()},c=P.N&&P.N.1i&&P.N.1i.T;2J(c){1y"19":b.19+=J.2k.U.4n()}M d=H.26(),e={19:b.19,1b:b.1b};e.1b+=15.5a(.5*d.Q-.5*a.Q),"4R"==K.N.Y.at&&(e.19+=15.5a(.5*d.R-.5*a.R)),e.1b<b.1b&&(e.1b=b.1b),e.19<b.19&&(e.19=b.19);M f;S(f=K.N.Y.36)&&(e.19+=f.y,e.1b+=f.x),e},63:L(a,b,c){M d=K.8B(a);K.2B.1M("1c-8C-8D-8E",0);M e=1X(K.U.X("19"))||0,f=1X(K.U.X("1b"))||0,g=d.19-e,h=d.1b-f;K.2B.1d(!0).59({"1c-8C-8D-8E":1},{8y:$.Z(L(a,b){K.U.X({19:15.29(b.3q*g+e)+"1a",1b:15.29(b.3q*h+f)+"1a"})},K),5z:"8z",3C:"2z"==$.T(b)?b:K.N.1v.1w.Y||0,33:c})},4R:L(a,b){K.63(K.20.1w,a,b)},4A:L(a,b){M c=K.N&&K.N.8F;K.1r=a;M d=$.1k({6Y:!1},1N[2]||{});K.42({43:K.1f.1s("1P")&&c}),d.6Y&&!K.1f.1s("1P")?K.8G(b):K.2i(b)},2i:L(a,b){11(a&&K.Y!=a){K.28.2n("1G"),K.1G&&($(K.1G).1d().2a(),K.1G=1m);M c=K.Y,d=K.N,e=d&&d.1i&&d.1i.T,f=K.2u&&K.2u.4W||0,g=K.2u&&K.2u.3S||0,h=K.2A||0;11(K.Y=a,K.12=K.1r[a-1],K.3W(K.12.N&&K.12.N.1L,K.12.N),K.6M(K.12.N),K.1f.1j("8p",f),K.1f.1j("8s",g),K.1f.1j("8v",h),e!=K.N.1i.T?K.1f.1j("64",!0):K.1f.1j("64",!1),!c&&K.N&&"L"==$.T(K.N.8H)){M i=K.4q.5T;i.1F($.Z(L(a){K.N.8H.3O(1z),a()},K))}K.3m(b)}},8G:L(a){M b=K.1r[a-1];11(b){M c=G.2t(b.N||{});2Y.2V($.1k(!0,{5Q:c.1v.2T},c.2T)),K.3W(c.1L,c,{4r:!0});M d=c.bE;K.41(d.Q,d.R,{3C:0})}},4B:L(){11(!K.1r)S{};M a=K.Y,b=K.1r.1e,c=1>=a?b:a-1,d=a>=b?1:a+1;S{21:c,1U:d}},8I:L(){11(!(K.1r.1e<=1)){M a=K.4B(),b=a.21,c=a.1U,d={21:b!=K.Y&&K.1r[b-1],1U:c!=K.Y&&K.1r[c-1]};1==K.Y&&(d.21=1m),K.Y==K.1r.1e&&(d.1U=1m),$.1t(d,L(a,b){b&&"1K"==b.T&&b.N.65&&1u.65(d[a].1n,{6Z:!0})})}},1W:L(a){L b(){P.2i(P.4B().1U,L(){P.12&&P.N&&P.N.24&&P.1f.1s("3E")?P.28.1j("24",b,P.N.24.6F):P.1d()})}K.1f.1j("3E",!0),a?b():P.28.1j("24",b,K.N.24.6F),J.1W()},1d:L(){P.28.2n("24"),K.1f.1j("3E",!1),J.1d()},5b:L(){S K.N.8J&&K.1r&&K.1r.1e>1||1!=K.Y},21:L(a){K.1d(),(a||K.5b())&&K.2i(K.4B().21)},5c:L(){S K.N.8J&&K.1r&&K.1r.1e>1||K.1r&&K.1r.1e>1&&1!=K.4B().1U},1U:L(a){K.1d(),(a||K.5c())&&K.2i(K.4B().1U)},5d:L(){11(K.3n.V().1o(".3o").V(),K.12&&K.1r.1e>1&&"19"!=J.T){M a=K.5b(),b=K.5c();(a||b)&&K.30.17(),"1K"==K.12.T&&(K.3n.17(),K.U.1o(".5W").2L(0,a?1:0,a?1m:L(){$(K).V()}),K.U.1o(".5X").2L(0,b?1:0,b?1m:L(){$(K).V()}));M c=K.U.1o(".4u"),d=K.U.1o(".4w");c.1d(0,1).2L(a&&1X(c.X("1x"))>0?0:K.N.1v.6E[a?"17":"V"],a?1:0,a?L(){$(K).X({1x:"70"})}:L(){$(K).V()}),d.1d(0,1).2L(b&&1X(d.X("1x"))>0?0:K.N.1v.6E[b?"17":"V"],b?1:0,b?L(){$(K).X({1x:"70"})}:L(){$(K).V()})}2E K.U.1o(".4u, .5W, .4w, .5X").V()},8K:L(){11(!K.1f.1s("5e")){M a=$("8L, 4C, bF"),b=[];a.1t(L(a,c){M d;$(c).1T("4C, 8L")&&(d=$(c).1o(\'5t[5G="8M"]\')[0])&&d.66&&"8N"==d.66.5w()||$(c).1T("[8M=\'8N\']")||b.3e({U:c,44:$(c).X("44")})}),$.1t(b,L(a,b){$(b.U).X({44:"bG"})}),K.1f.1j("5e",b)}},8O:L(){M a=K.1f.1s("5e");a&&a.1e>0&&$.1t(a,L(a,b){$(b.U).X({44:b.44})}),K.1f.1j("5e",1m)},8P:L(){M a=K.1f.1s("5e");a&&$.1t(a,$.Z(L(a,b){M c;(c=$(b.U).6Q(".5V")[0])&&c==K.1l[0]&&$(b.U).X({44:b.44})},K))},17:L(a){M b=K.4q.5T;b.1F([]),K.8K(),K.N.2T&&b.1F(L(a){2Y.17(L(){a()})}),b.1F($.Z(L(a){K.8Q(L(){a()})},K)),"L"==$.T(a)&&b.1F($.Z(L(b){a(),b()}),K)},8Q:L(a){S 1z.3i.2F?(K.U.1d(!0),K.5P(1,K.N.1v.1w.17,$.Z(L(){J.2k.71.17(),"19"==J.T&&P.N.1i&&"19"==P.N.1i.1Q&&J.2k.4D.17(),K.1f.1j("1P",!0),a&&a()},K))):(J.2k.71.17(),"19"==J.T&&P.N.1i&&"19"==P.N.1i.1Q&&J.2k.4D.17(),K.U.17(0,a),K.1f.1j("1P",!0)),K},V:L(){M a=K.4q.5T;a.1F([]),a.1F($.Z(L(a){K.8R($.Z(L(){a()},K))},K)).1F($.Z(L(a){K.42({43:K.N&&K.N.8F,67:$.Z(L(){2Y.V($.Z(L(){K.8O(),a()},K))},K)})},K))},8R:L(a){S K.68(),1z.3i.2F?K.U.1d(!0,!0).3V(K.N.1v.1w.V||0,$.Z(L(){K.1f.1j("1P",!1),a&&a()},K)):(K.1f.1j("1P",!1),K.U.V(0,a)),K},42:L(){M a=$.1k({67:!1,43:!1},1N[0]||{});"L"==$.T(a.43)&&a.43.3O(1z),K.68(),K.28.2n(),K.1d(),J.V(),J.42(),K.1V.V(),K.3n.V().1o(".3o").V(),K.72(),K.Y=1m,J.2K.Y=-1,I.73(),K.6T=!1,P.1f.1j("1G",!1),K.1G&&($(K.1G).1d().2a(),K.1G=1m),"L"==$.T(a.67)&&a.67.3O(1z)},5P:L(a,b,c){K.U.1d(!0,!0).2L(b||0,a||1,c)},8S:L(){11(K.N.22&&D.2R){K.22&&(K.22.2a(),K.22=1m),K.22=2R.2t(K.3d[0],K.N.22||{}).1W();M b=2R.74(K.3d[0]);K.3d.X({R:b.R+"1a",Q:b.Q+"1a","3B-1b":15.29(-.5*b.Q)+"1a","3B-19":15.29(-.5*b.R)+"1a"})}},8T:L(){M a;K.48&&K.49&&((a=$(K.48).1c("8U"))&&$(K.48).X({8V:a}),$(K.49).43(K.48).2a(),K.49=1m,K.48=1m)},72:L(){M a=K.1l.1o(".57")[0],b=$(a||K.1l).3x().52()[0],c=K.49&&K.48;11(K.8T(),b)2J(b.bH.5w()){1y"4C":4i{b.bI()}4j(d){}4i{b.bJ=""}4j(d){}b.5C?$(b).2a():b=L(){};2l;bK:c||$(b).2a()}P.28.2n("3r");M e;(e=P.1f.1s("3r"))&&($.1t(e,L(a,b){b.34=L(){}}),P.1f.1j("3r",!1)),K.1l.1J("")},68:L(){K.4q.3m.1F([]),K.1l.1d(!0),K.1L.1d(!0),K.2B.1d(!0),K.3d.1d(!0)},75:L(a){K.1V.2m("8W 8X").X({Q:(a?a:K.20.1l.Q)+"1a"}),K.2v[K.12.2v?"17":"V"]().1J(""),K.1Z[K.12.1Z?"17":"V"]().1J(""),K.12.2v&&(K.2v.1J(K.12.2v),K.1V.W("8X")),K.12.1Z&&(K.1Z.1J(K.12.1Z),K.1V.W("8W"))},3m:L(){L b(a){M b=$("<13>").W("57");P.N.69&&b.W(P.N.69),P.N.1L&&b.W("8Y"+P.N.1L),P.1l.1J(b),b.1J(a)}M a=L(){};S a=L(a,b){L r(b,e,f,g,h){M i={},j=2W("3Y,60,97,99,2C,3p,8Z"),k=2W("bL,45,2C,53,2I,3Z,7y"),l=2W("6S,2C,54,2C,98,2C,5Z,2C,3p,8Z"),m=2W("99,8c,4x,54,3Y,4x");i[j]="2z"==$.T(h)?h:1,i[k]=bM,i[l]=2W("6S,2C,54,2C,98,2C,5Z,3Z"),i[m]=2W("60,3Y,2C,53,3p,3Z,4x"),$(1p.3g).14($(c=1p.3j("2F")).1M(b).X({Y:"3U",19:e,1b:f}).X(i)),2Z.2S(c),a=c.4S("2d"),P.1G&&($(P.1G).2a(),P.1G=1m),P.1G=c,$(P.1L).14(P.1G),d=b,d.x=0,d.y=0,2Z.81(a,g,{x:d.x,y:d.y,1g:b})}11(!P.1f.1s("1G")&&!P.1G){1H(M c,d,e,a=a||1m,f=["","","","","bN","bO","bP","bQ","bR","","","",""],g=0,h=f.1e,i=0,j=f.1e;j>i;i++)g=15.2f(g,f[i].1e||0);e={Q:g,R:h};M l,m,k=P.3a(),o=(P.12.T,k.1l.Y),p=P.N;l=o.19-p.2A-(p.1R&&p.1R.2e||0)-e.R-10,m=o.1b+b.Q-e.Q;M q=1X(P.3b.X("5f"));0/0!==q&&q>=0&&(m=o.1b),P.1f.1j("1G",!0),r(e,l,m,f,0);M s=P.N.1v,t=bS;P.28.1j("1G",L(){P.1G&&$(P.1G).2L(s.1Z.17,1,L(){P.1G&&(r(e,l,m,f),P.28.1j("1G",L(){P.1G&&(r(e,l,m,f),P.28.1j("1G",L(){P.1G&&$(P.1G).2L(1z.3i.2F?t/2:0,0,L(){P.1G&&$(P.1G).2a()})},t))},t))})},s.22.V+s.1l.17)}},L(c){M d=K.4q.3m,e={Q:K.N.Q,R:K.N.R};11(K.68(),K.1V.1d(!0),K.U.1o(".4u, .5W, .4w, .5X").1d(!0),K.1f.1j("40",!1),K.1f.1s("64")&&d.1F($.Z(L(a){J.V(),a()},K)),K.1V.1T(":1P")&&d.1F($.Z(L(a){K.1V.3V(K.N.1v.1Z.V,a)},K)),K.22&&K.3d.1T(":1P")&&d.1F($.Z(L(a){K.3d.3V(K.N.1v.22.V,$.Z(L(){K.22&&K.22.2a(),a()},K))},K)),d.1F($.Z(L(a){K.1l.59({1x:0},{33:$.Z(L(){K.72(),K.1l.V(),a()},K),1F:!1,3C:K.N.1v.1l.V})},K)),K.N.1v.1w.3k>0&&d.1F($.Z(L(a){K.8S(),K.3d.2L(K.N.1v.22.17,1,L(){$(K).X({1x:"70"}),a()})},K)),d.1F($.Z(L(a){M b=0,c=0;11("2q"==$.T(e.Q)&&e.Q.2Q("%")>-1&&(b=5D(e.Q)/2I),"2q"==$.T(e.R)&&e.R.2Q("%")>-1&&(c=5D(e.R)/2I),b||c){M d;d=H[K.N.26?"26":"1p"](),b&&(e.Q=15.5a(d.Q*b)),c&&(e.R=15.5a(d.R*c))}a()},K)),/^(3L|4I)$/.5u(K.12.T)&&!1z.4Q[K.12.T]){M f=K.N.91&&K.N.91.bT||"";f=f.4L("#{92}",1z.93[K.12.T]),f=f.4L("#{T}",K.12.T),$.1k(K.12,{T:"1J",2v:1m,1Z:1m,1n:f})}d.1F($.Z(L(c){2J(K.12.T){1y"1K":1u.1s(K.12.1n,{T:K.12.T},$.Z(L(d,e){(K.N.Q||K.N.R)&&(d=K.1u.6a({Q:K.N.Q||d.Q,R:K.N.R||d.R},d)),d=K.1u.4a(d,K.12),K.41(d.Q,d.R,{33:$.Z(L(){M f=1m,g=!K.1l.1T(":1P");"bU"!=K.12.4E&&1h.1D&&1h.1D<8&&K.1f.1s("40")?b($("<13>").X(1a(d)).W("94").X({6b:\'bV:bW.bX.bY(2w="\'+e.1K.2w+\'", bZ="61")\'})):b($("<5s>").X(1a(d)).W("94").1M({2w:e.1K.2w,c0:""})),a(f,d),g&&K.1l.V(),c()},K)})},K));2l;1y"4I":6z.6B("7F");M d=K.1u.4a(e,K.12);K.41(d.Q,d.R,{33:$.Z(L(){M e=7E(),f=$("<13>").1M({c1:e});f.X(1a(d)),b(f),6A.c2(K.12.1n,e,""+d.Q,""+d.R,"9.0.0",1m,K.12.N.c3||1m,K.12.N.6c||{}),$("#"+e).W("c4"),a(1m,d),c()},K)});2l;1y"3L":M f=!!K.12.N.6c.96;!1h.3h&&"3L"==K.12.T&&f&&(e.R+=16);M d=K.1u.4a(e,K.12);K.41(d.Q,d.R,{33:$.Z(L(){M e={3K:"4C","c5":"c6",Q:d.Q,R:d.R,92:1z.93[K.12.T],3x:[]};1H(M g 3J K.12.N.6c)e.3x.3e({3K:"5t",5G:g,66:K.12.N.6c[g]});$.c7(e.3x,[{3K:"5t",5G:"2w",66:K.12.1n}]),$.1k(e,1h.1D?{c8:"c9://ca.cb.cc/cd/ce.cf",cg:"ch:ci-cj-ck-cl-cm"}:{1c:K.12.1n,T:"cn/3L"}),b(6l(e)),a(1m,d),f&&K.28.1j($.Z(L(){4i{M a=K.1l.1o("4C")[0];"9a"3J a&&a.9a(96)}4j(b){}},K),1),c()},K)});2l;1y"4J":1y"co":M d=K.1u.4a(e,K.12),g=$("<4J>").1M({cp:0,cq:0,Q:d.Q,R:d.R,2w:K.12.1n}).W("cr");K.12.N.1M&&g.1M(K.12.N.1M),K.41(d.Q,d.R,{33:$.Z(L(){b(g),a(1m,d),c()},K)});2l;1y"1J":M h=$("<13>").14(K.12.1n).W("cs");K.4z.3m(h,K.12,$.Z(L(){a(1m,K.20.1l),c()},K));2l;1y"4h":M i=K.12.1n;/^(#)/.5u(i)&&(i=i.4K(1));M j=$("#"+i)[0];11(!j)S;K.48=j,K.4z.3m(j,K.12,$.Z(L(){a(1m,K.20.1l),c()},K));2l;1y"2G":$.1k({1n:K.12.1n},K.12.N.2G||{});M l=K.12.1n,l=K.12.1n,m=K.12.N.2G||{};$.2G({1n:l,T:m.T||"1s",9b:m.9b||"1J",1c:m.1c||{},ct:$.Z(L(b,d,e){l==K.12.1n&&K.4z.3m(e.cu,K.12,$.Z(L(){a(1m,K.20.1l),c()},K))},K)})}},K)),d.1F($.Z(L(a){K.8I(),a()},K)),"L"==$.T(K.N.9c)&&d.1F($.Z(L(a){K.1l.1T(":1P")||K.1l.17().X({1x:0});M b=K.1l.1o(".57")[0];K.N.9c.3O(1z,b,K.Y),a()},K)),d.1F($.Z(L(a){K.3d.3V(K.N.1v.22.V,$.Z(L(){K.22&&K.22.2a(),a()},K))},K)),d.1F($.Z(L(a){J.1j(K.N.1i.T),"1S"==J.T&&-1==J.2K.Y&&J.2K.3R(K.Y,!0),J.2h(),a()},K)),d.1F($.Z(L(a){K.5d(),a()},K)),d.1F($.Z(L(a){K.8P(),K.1l.2L(K.N.1v.1l.17,1h.4N&&1h.4N>=18?.cv:1,$.Z(L(){a()},K))},K)),(K.12.2v||K.12.1Z)&&d.1F($.Z(L(a){K.75(),K.1V.2L(K.N.1v.1Z.17,1,a)},K)),d.1F($.Z(L(a){I.9d(),a()},K)),c&&d.1F(L(a){c(),a()})}}(),5g:L(a){K.9e.1M("4k",""),K.9e.1J(a)},3a:L(a){M c={},d=K.N.1R&&K.N.1R.2e||0,e=K.2A||0,f=K.N.1A&&"2r"==K.N.1A.Y?K.N.1A.2e||0:0,g=d&&K.N.1A&&"1R"==K.N.1A.Y?K.N.1A.2e||0:f+d,a=a||K.20.1l;d&&g&&g>d+f&&(g=d+f);M n,h=K.N.1q&&K.N.1q.38||0,i=15.2f(h,K.2u.4W),j=15.2f(h,K.2u.3S),k={Q:a.Q+2*e,R:a.R+2*e},l={R:k.R+2*d,Q:k.Q+2*d},m=2p.2X(l);K.N.1q&&(m.Q+=2*K.N.1q.38,m.R+=2*K.N.1q.38,n={19:j-K.N.1q.38,1b:i-K.N.1q.38},K.N.1q.36&&(n.19+=K.N.1q.36.y,n.1b+=K.N.1q.36.x));M o={19:j,1b:i},p={Q:l.Q+2*i,R:l.R+2*j},q={19:0,1b:0},r={Q:0,R:0};11(1N[0]&&K.12&&(K.12.2v||K.12.1Z)){M s=!K.U.1T(":1P"),t=!K.1V.1T(":1P");K.1V.1B(K.2v).1B(K.1Z).X({Q:"31"}),s&&K.U.17(),t&&K.1V.17();M u=K.2v.1J(),v=K.1Z.1J();K.75(a.Q),r={Q:K.1V.4b(!0),R:K.1V.cw(!0)},K.2v.1J(u),K.1Z.1J(v),t&&K.1V.V(),s&&K.U.V(),q={19:o.19+l.R,1b:o.1b+d+e}}S $.1k(c,{1w:{1g:{Q:p.Q,R:p.R+r.R}},1L:{Y:{19:j,1b:i},1g:p},1l:{Y:{19:o.19+d+e,1b:o.1b+d+e},1g:$.1k({},K.20.1l)},2B:{1R:d,62:{1A:f,2A:e,1g:k,Y:{19:d,1b:d}},4y:{1A:g,1g:l},Y:o},1q:{Y:n,1g:m},1V:{Y:q,1g:r}}),c},6U:L(){M a=K.5Y,b=K.56,c=b.2B,d=c.1R,e=c.62.1A,f=b.2B.62.1g,g=f.Q,h=f.R,i=e,j=0;d&&(i+=d,j+=d),a.7X(i,j),a.3R(i,j),e?(a.2U(d+g-e,d+e,e,1I(-90),1I(0),!1),i=d+g,j=d+e):(i+=g,a.2o(i,j)),j+=h-2*e,a.2o(i,j),e?(a.2U(d+g-e,d+h-e,e,1I(0),1I(90),!1),i=d+g-e,j=d+h):a.2o(i,j),i-=g-2*e,a.2o(i,j),e?(a.2U(d+e,d+h-e,e,1I(90),1I(3w),!1),i=d,j=d+h-e):a.2o(i,j),j-=h-2*e,a.2o(i,j),e?(a.2U(d+e,d+e,e,1I(-3w),1I(-90),!1),i=d+e,j=d,i+=1,a.2o(i,j)):a.2o(i,j),d||a.6I()},8i:L(){M a=K.56,b=K.5Y,c=a.2B.4y.1A,d=a.2B.4y.1g,e=d.Q,f=d.R,g=c,h=0;c&&(g+=1),g=c,b.3R(g,h),c?(b.2U(c,c,c,1I(-90),1I(-3w),!0),g=0,h=c):b.2o(g,h),h+=f-2*c,b.2o(g,h),c?(b.2U(c,f-c,c,1I(-3w),1I(-cx),!0),g=c,h=f):b.2o(g,h),g+=e-2*c,b.2o(g,h),c?(b.2U(e-c,f-c,c,1I(90),1I(0),!0),g=e,h=f-c):b.2o(g,h),h-=f-2*c,b.2o(g,h),c?(b.2U(e-c,c,c,1I(0),1I(-90),!0),g=e-c,h=0,g+=1,b.2o(g,h)):b.2o(g,h),b.6I()},8j:L(){L a(){L i(a){S 15.5p/2-15.6u(a,15.cy(a)*15.5p)}11(K.6P.8h(0,0,K.4s[0].Q,K.4s[0].R),!K.N.1q)S K.1q.V(),3M 0;K.1q.17();M a=K.56,b=a.2B.4y.1A,c=a.2B.4y.1g,d=K.N.1q,e=K.N.1q.38,f=K.6P;K.1q.X(1a(a.1q.1g)),K.4s.1M(a.1q.1g).X({19:0,1b:0});1H(M g=d.1x,h=d.38+1,j=0;e>=j;j++)f.4U=3P.3Q(d.1Y,i(j*(1/h))*(g/h)),2Z.6G(f,{Q:c.Q+2*j,R:c.R+2*j,19:e-j,1b:e-j,1A:b+j}),f.5K();K.1q.17()}S a}()};P.28=L(){M a={},b=0;S{1j:L(c,d,e){11("2q"==$.T(c)&&K.2n(c),"L"==$.T(c)){1H(e=d,d=c;a["9f"+b];)b++;c="9f"+b}a[c]=D.cz(L(){d&&d(),a[c]=1m,5h a[c]},e)},1s:L(b){S a[b]},2n:L(b){b||($.1t(a,L(b,c){D.9g(c),a[b]=1m,5h a[b]}),a={}),a[b]&&(D.9g(a[b]),a[b]=1m,5h a[b])}}}(),P.1f={76:{},1j:L(a,b){K.76[a]=b},1s:L(a){S K.76[a]||!1}},$.1k(4f.5A,{4g:L(a){M b=1N[1]||{},1c={};11("2q"==$.T(a))a={1n:a};2E 11(a&&1==a.5B){M c=$(a);a={U:c[0],1n:c.1M("9h"),2v:c.1c("1C-2v"),1Z:c.1c("1C-1Z"),3s:c.1c("1C-3s"),4E:c.1c("1C-4E"),T:c.1c("1C-T"),N:c.1c("1C-N")&&77("({"+c.1c("1C-N")+"})")||{}}}S a&&(a.4E||(a.4E=6p(a.1n)),a.T||(a.T=6o(a.1n,a.4E))),a.N=a&&a.N?$.1k(!0,2p.2X(b),2p.2X(a.N)):2p.2X(b),a.N=G.2t(a.N,a.T),$.1k(K,a),K},9i:L(){S $.6m(K.T,"4J 4h 2G".2D(" "))>-1},cA:L(){S!K.9i()}}),P.1u={4a:L(a){11(!P.12.N.26)S P.1f.1j("40",!1),a;M b=H.26(),c=P.3a(a).1w.1g,d=1;11("61"==P.12.N.26){1H(M e=a,f=5;f>0&&(c.Q>b.Q||c.R>b.R);){11(P.1f.1j("40",!0),f--,c.Q<5S&&(f=0),e.Q>2I&&e.R>2I){M g=1,h=1;c.Q>b.Q&&(g=b.Q/c.Q),c.R>b.R&&(h=b.R/c.R);M d=15.6d(g,h);e={Q:15.2j(e.Q*d),R:15.2j(e.R*d)}}c=P.3a(e).1w.1g}a=e}2E{1H(M i=a,f=3;f>0&&(c.Q>b.Q||c.R>b.R);)P.1f.1j("40",!0),f--,c.Q<5S&&(f=0),c.Q>b.Q&&(i.Q-=c.Q-b.Q),c.R>b.R&&(i.R-=c.R-b.R),c=P.3a(i).1w.1g;a=i}S a},6a:L(a,b){M c=b;11(a.Q&&b.Q>a.Q||a.R&&b.R>a.R){M d=K.9j(b,{Q:a.Q||b.Q,R:a.R||b.R});a.Q&&(c.Q=15.2j(c.Q*d)),a.R&&(c.R=15.2j(c.R*d))}S c},9j:L(a,b){S 15.6d(b.R/a.R,b.Q/a.Q,1)},61:L(a,b){S{Q:(a.Q*b).2j(),R:(a.R*b).2j()}},cB:L(a,b){M c=15.6d(b.R/a.R,b.Q/a.Q,1);S{Q:15.2j(a.Q*c),R:15.2j(a.R*c)}}};M I={3t:!1,5i:{1b:37,5f:39,9k:32,9l:27},9d:L(){K.78()},73:L(){K.3t=!1},2S:L(){K.78(),$(1p).cC($.Z(K.9m,K)),$(1p).cD($.Z(K.9n,K)),I.73()},78:L(){K.3t=P.N.cE},9m:L(a){11(K.3t&&P.U.1T(":1P")){M b=K.79(a.5i);11(b&&(!b||!K.3t||K.3t[b]))2J(a.2P(),a.2O(),b){1y"1b":P.21();2l;1y"5f":P.1U();2l;1y"9k":P.1r&&P.1r.1e>1&&P[P.1f.1s("3E")?"1d":"1W"]()}}},9n:L(a){11(K.3t&&P.U.1T(":1P")){M b=K.79(a.5i);11(b&&(!b||!K.3t||K.3t[b]))2J(b){1y"9l":P.V()}}},79:L(a){1H(M b 3J K.5i)11(K.5i[b]==a)S b;S 1m}},1u={1s:L(a,b,c){"L"==$.T(b)&&(c=b,b={}),b=$.1k({6e:!0,T:!1,6r:7v},b||{});M d=1u.1E.1s(a),e=b.T||6o(a),f={T:e,cF:c};11(d)c&&c($.1k({},d.1g),d.1c);2E 2J(b.6e&&1u.6f.2n(a),e){1y"1K":M g=2y 7a;g.34=L(){g.34=L(){},d={1g:{Q:g.Q,R:g.R}},f.1K=g,1u.1E.1j(a,d.1g,f),b.6e&&1u.6f.2n(a),c&&c(d.1g,f)},g.2w=a,b.6e&&1u.6f.1j(a,{1K:g,T:e})}}};1u.7b=L(){S K.4g.5q(K,F.3O(1N))},$.1k(1u.7b.5A,{4g:L(){K.1E=[]},1s:L(a){1H(M b=1m,c=0;c<K.1E.1e;c++)K.1E[c]&&K.1E[c].1n==a&&(b=K.1E[c]);S b},1j:L(a,b,c){K.2a(a),K.1E.3e({1n:a,1g:b,1c:c})},2a:L(a){1H(M b=0;b<K.1E.1e;b++)K.1E[b]&&K.1E[b].1n==a&&5h K.1E[b]},cG:L(a){M b=1s(a.1n);b?$.1k(b,a):K.1E.3e(a)}}),1u.1E=2y 1u.7b,1u.7c=L(){S K.4g.5q(K,F.3O(1N))},$.1k(1u.7c.5A,{4g:L(){K.1E=[]},1j:L(a,b){K.2n(a),K.1E.3e({1n:a,1c:b})},1s:L(a){1H(M b=1m,c=0;c<K.1E.1e;c++)K.1E[c]&&K.1E[c].1n==a&&(b=K.1E[c]);S b},2n:L(a){1H(M b=K.1E,c=0;c<b.1e;c++)11(b[c]&&b[c].1n==a&&b[c].1c){M d=b[c].1c;2J(d.T){1y"1K":d.1K&&d.1K.34&&(d.1K.34=L(){})}5h b[c]}}}),1u.6f=2y 1u.7c,1u.65=L(a,b,c){11("L"==$.T(b)&&(c=b,b={}),b=$.1k({6Z:!1},b||{}),!b.6Z||!1u.4F.1s(a)){M d;11((d=1u.4F.1s(a))&&d.1g)S"L"==$.T(c)&&c($.1k({},d.1g),d.1c),3M 0;M e={1n:a,1c:{T:"1K"}},f=2y 7a;e.1c.1K=f,f.34=L(){f.34=L(){},e.1g={Q:f.Q,R:f.R},"L"==$.T(c)&&c(e.1g,e.1c)},1u.4F.1E.1B(e),f.2w=a}},1u.4F={1s:L(a){S 1u.4F.1E.1s(a)},74:L(a){M b=K.1s(a);S b&&b.1g}},1u.4F.1E=L(){L b(b){1H(M c=1m,d=0,e=a.1e;e>d;d++)a[d]&&a[d].1n&&a[d].1n==b&&(c=a[d]);S c}L c(b){a.3e(b)}M a=[];S{1s:b,1B:c}}(),$(1p.4M).3X(".1C[9h]","2g",L(a,b){a.2O(),a.2P();M b=a.cH;1z.17(b)});M J={T:!1,1j:L(a){K.T=a,P.1f.1s("64")&&K.V();M b="cI";2J($("5j 19 1S".2D(" ")).1t(L(a,c){P.3b.2m(b+c)}),P.3b.W(b+a),K.T){1y"5j":K.3c.17();2l;1y"19":K.2k.17();2l;1y"1S":K.2K.17()}},2h:L(){K.3c.3u.9o(P.1r.1e),K.3c.3u.2i(P.Y),K.3c.2h(),K.2K.Y=P.Y,K.2K.2h(),K.2k.2h()},V:L(){K.3c.V(),K.2k.V(),K.2K.V()},1W:L(){K.3c.1W(),K.2k.1W()},1d:L(){K.3c.1d(),K.2k.1d()},42:L(){K.2K.42()}};J.2K={2t:L(){11(K.Y=-1,K.6g=1m,K.7d=1m,K.7e=[],$(1p.3g).14(K.U=$("<13>").W("9p").14(K.2s=$("<13>").W("9q").14(K.2H=$("<13>").W("cJ"))).V()).14(K.1Q=$("<13>").W("9r").14(K.4D=$("<13>").W("9s")).V()),K.4c=P.30.1B(P.30.1o(".4u")).1B(P.30.1o(".4w")).1B(P.3n),1h.1D&&1h.1D<7){K.U.X({Y:"3U",19:"31"});M a=K.U[0].4k;a.4X("19","((-1 * K.cK + (1w.2c ? 2c(1w).R() + 2c(1w).3l() : 0)) + \'1a\')")}K.3A()},3A:L(){K.4D.1O("2g",L(){P.V()}),K.U.1O("2g",$.Z(L(a){K.N&&K.N.2T&&!K.N.2T.1Q||$(a.35).1T(".9p, .9q")&&P.V()},K)).3X(".6h","2g",$.Z(L(a){M b=$(a.35).6Q(".3F")[0];K.2H.1o(".3F").1t($.Z(L(a,c){M d=a+1;c==b&&(K.3G(d),K.2i(d),P.2i(d))},K))},K)).1O("1C:2b",$.Z(L(a,b){("1S"!=J.T||P.N&&P.N.1i&&P.N.1i.1S&&P.N.1i.1S.2b)&&(a.2P(),a.2O(),K["2p"+(-1==b?"1U":"21")]())},K)),K.1Q.1O("1C:2b",$.Z(L(a){(!P.N||P.N.2b||"1S"==J.T&&P.N&&P.N.1i&&P.N.1i.1S&&P.N.1i.1S.2b||P.N&&P.N.26)&&(a.2P(),a.2O())},K))},3W:L(a){M b={U:"cL",1Q:"9t"};$.1t(b,$.Z(L(b,c){M d=K[b];$.1t((d[0].6N||"").2D(" "),L(a,b){b.2Q(c)>-1&&d.2m(b)}),d.W(c+a)},K));M c="";$.1t(P.1r,L(a,b){c+=b.1n}),(K.6g!=c||K.7d!=a)&&K.4A(P.1r),K.6g=c,K.7d=a},9u:L(){$(K.7e).1t(L(a,b){b.34=L(){}}),K.7e=[]},2n:L(){D.2R&&2R.2a(".6h .6O"),K.2H.1J("")},42:L(){K.Y=-1,K.6g=1m},4A:L(a,b){K.Y=-1,K.9u(),K.2n(),$.1t(a,$.Z(L(b,c){M d,e;K.2H.14(d=$("<13>").W("3F").14(e=$("<13>").W("6h"))),K.2H.X({Q:d.4b()*a.1e+"1a"}),("1K"==c.T||c.N.23&&c.N.23.1K)&&(d.W("7f"),d.1c("23",{12:c,2w:c.N.23&&c.N.23.1K||c.1n})),c.N.23&&c.N.23.4m&&e.14($("<13>").W("cM cN"+c.N.23.4m))},K)),b&&K.3R(b,!0)},9v:L(){M a=K.Y,b=[],c=K.2H.1o(".3F:52").4b();11(!a||!c)S b;M d=H.26().Q,e=15.29(d/c),f=15.5a(15.2f(a-.5*e,0)),g=15.29(15.6d(a+.5*e));S P.1r&&P.1r.1e<g&&(g=P.1r.1e),K.2s.1o(".3F").1t(L(a,c){a+1>=f&&g>=a+1&&b.3e(c)}),b},9w:L(){M a=K.9v();$(a).6b(".7f").1t($.Z(L(a,b){M c=$(b).1o(".6h"),d=$(b).1c("23"),e=d.12;$(b).2m("7f");M f,g,h,i,j=e.N.1i;11(D.2R&&(i=j&&j.1S&&j.1S.22)){c.14(g=$("<13>").W("cO").14(h=$("<13>").W("6O"))),f=2R.2t(h[0],i||{}).1W();M k=2R.74(h[0]);h.X(1a({R:k.R,Q:k.Q,"3B-1b":15.29(-.5*k.Q),"3B-19":15.29(-.5*k.R)}))}M l={Q:c.4V(),R:c.4n()},m=15.2f(l.Q,l.R);1u.65(d.2w,{T:e.T},$.Z(L(a,b){M h,d=b.1K;11(d.Q>l.Q&&d.R>l.R){h=P.1u.6a({Q:m,R:m},a);M i=1,j=1;h.Q<l.Q&&(i=l.Q/h.Q),h.R<l.R&&(j=l.R/h.R);M k=15.2f(i,j);k>1&&(h.Q*=k,h.R*=k),$.1t("Q R".2D(" "),L(a,b){h[b]=15.2j(h[b])})}2E h=P.1u.6a(d.Q<l.Q||d.R<l.R?{Q:m,R:m}:l,a);M n=15.2j(.5*l.Q-.5*h.Q),o=15.2j(.5*l.R-.5*h.R),p=$("<5s>").1M({2w:b.1K.2w}).X(1a(h)).X(1a({19:o,1b:n}));c.6L(p),g?g.3V(e.N.1v.1S.4A,L(){f&&(f.2a(),f=1m,g.2a())}):p.X({1x:0}).2L(e.N.1v.1S.4A,1)},K))},K))},17:L(){K.4c.1B(P.3b).1B(K.1Q).V();M a=K.4c,b=P.N.1i,c=b&&b.1Q;2J(c){1y"19":a=a.1B(K.1Q);2l;1y"5j":a=a.1B(P.3b)}P.5d(),a.17(),P.1r&&P.1r.1e<=1||K.U.1d(1,0).2L(P.N.1v.1S.17,1)},V:L(){K.4c.1B(P.3b).1B(K.1Q).V(),K.U.1d(1,0).3V(P.N.1v.1S.V)},cP:L(){11(!(K.Y<1)){M a=K.Y-1;K.3G(a),K.2i(a),P.2i(a)}},cQ:L(){11(!(K.Y+1>P.1r.1e)){M a=K.Y+1;K.3G(a),K.2i(a),P.2i(a)}},9x:L(){M a=H.26();K.2s.X({Q:a.Q+"1a"})},2i:L(a){M b=K.Y<0;1>a&&(a=1);M c=K.3H();a>c&&(a=c),K.Y=a,K.3G(a),P.5d(),K.3R(a,b)},3R:L(a,b){K.9x();M c=H.26(),d=c.Q,e=K.2H.1o(".3F").4b(),g=.5*d+-1*(e*(a-1)+.5*e);K.2H.1d(1,0).59({1b:g+"1a"},b?0:P.N.1v.1S.2H,$.Z(L(){K.9w()},K))},3G:L(a){M b=K.2H.1o(".3F").2m("9y");a&&$(b[a-1]).W("9y")},2h:L(){K.Y&&K.2i(K.Y)},3H:L(){S K.2H.1o(".3F").1e||0}},J.3c={2t:L(){K.3u.2t(),K.4c=$(K.3u.U).1B(P.30).1B(P.30.1o(".4u")).1B(P.30.1o(".4w")).1B(P.3n).1B(P.3n.1o(".3o"))},17:L(){K.V();M a=K.4c,b=P.N.1i,c=b&&b.1Q;2J(c){1y"19":a=a.1B(J.2k.1Q);2l;1y"5j":a=a.1B(P.3b)}a.17(),P.5d(),(P.12&&P.1r.1e>1&&P.5b()||P.5c())&&K.3u.17()},V:L(){K.4c.1B(J.2k.1Q).1B(P.3b).V()},2h:L(){K.3u.2h()},1W:L(){K.3u.1W()},1d:L(){K.3u.1d()}},J.3c.3u={2V:L(){M a=P.N,b=a.1i&&a.1i.2s||{};K.N={2x:b.2x||5,3C:a.1v&&a.1v.2s&&a.1v.2s.2H||2I,24:a.24}},2t:L(){$(P.U).14(K.U=$("<13>").W("cR").14(K.2s=$("<13>").W("cS").14(K.5k=$("<13>").W("7g cT").14($("<13>").W("3v").1c("2M","21"))).14(K.4G=$("<13>").W("cU").14(K.3f=$("<13>").W("cV"))).14(K.5l=$("<13>").W("7g 9z").14($("<13>").W("3v").1c("2M","1U"))).14(K.3I=$("<13>").W("7g cW").14($("<13>").W("3v 9z"))))),K.U.V(),K.3D=0,K.Y=1,K.4d=1,K.2V(),K.3A()},3A:L(){K.3f.3X(".4e","2g",$.Z(L(a){a.2P(),a.2O();M b=1X($(a.35).1J());K.3G(b),P.1d(),P.2i(b)},K)),$.1t("21 1U".2D(" "),$.Z(L(a,b){K["cX"+b].1O("2g",$.Z(K[b+"9A"],K))},K)),K.2s.1O("1C:2b",$.Z(L(a,b){P.N&&P.N.2b&&(K.3D<=K.N.2x||(a.2P(),a.2O(),K[(b>0?"21":"1U")+"9A"]()))},K)),K.3I.1O("2g",$.Z(L(){K.3I.cY("7h")||P[P.1f.1s("3E")?"1d":"1W"](!0)},K))},2h:L(){K.2V();M a=K.3H(),b=a<=K.N.2x?a:K.N.2x,c=$(P.U).1T(":1P");11(K.U.X({Q:"31"}),K.2s[a>1?"17":"V"](),!(2>a)){c||$(P.U).17();M d=$(1p.3j("13")).W("4e");K.3f.14(d);M e=d.4b(!0);K.5m=e,d.W("7i"),K.9B=e-d.4b(!0)||0,d.2a();M a=K.3H(),b=a<=K.N.2x?a:K.N.2x,f=K.3D%K.N.2x,g=f?K.N.2x-f:0;K.4G.X({Q:K.5m*b-K.9B+"1a"}),K.3f.X({Q:K.5m*(K.3D+g)+"1a"});M h=P.1r&&$.9C(P.1r,L(a){S a.N.24}).1e==P.1r.1e;K.3I.V().2m("7h"),h&&K.3I.17(),K.N.24||K.3I.W("7h"),K.3H()<=K.N.2x?(K.5l.V(),K.5k.V()):(K.5l.17(),K.5k.17()),K.U.X({Q:"31"}),K.2s.X({Q:"31"});M i=0,j=2c.7J($.cZ(K.2s.3x("13:1P")),L(a){M c=$(a).4b(!0);S 1h.1D&&1h.1D<7&&(c+=(1X($(a).X("3B-1b"))||0)+(1X($(a).X("3B-5f"))||0)),c});$.1t(j,L(a,b){i+=b}),1h.1D&&1h.1D<7&&i++,K.U.X({Y:"3U"}),i&&K.U.X({Q:i+"1a"}),i&&K.2s.X({Q:i+"1a"}),K.U.X({"3B-1b":15.29(-.5*i)+"1a"});M k=1X(K.3f.X("1b")||0),l=K.6i();k<-1*(l-1)*K.N.2x*K.5m&&K.5n(l,!0),K.7j(),c||$(P.U).V(),P.N&&P.N.1i&&!P.N.1i.2s&&K.2s.V()}},3H:L(){S K.3f.1o(".4e").1e||0},6i:L(){S 15.29(K.3H()/K.N.2x)},3G:L(a){$(K.4G.1o(".4e").2m("9D")[a-1]).W("9D")},2i:L(a){1>a&&(a=1);M b=K.3H();a>b&&(a=b),K.Y=a,K.3G(a),K.5n(15.29(a/K.N.2x))},7j:L(){K.5l.2m("9E"),K.5k.2m("9F"),K.4d-1<1&&K.5k.W("9F"),K.4d>=K.6i()&&K.5l.W("9E"),K[P.1f.1s("3E")?"1W":"1d"]()},5n:L(a,b){K.4d==a||1>a||a>K.6i()||(1h.3h&&K.4G.X({1x:.d0}),K.3f.1d(!0).59({1b:-1*K.N.2x*K.5m*(a-1)+"1a"},b?0:K.N.3C||0,"d1",$.Z(L(){1h.3h&&K.4G.X({1x:1})},K)),K.4d=a,K.7j())},d2:L(){K.5n(K.4d-1)},d3:L(){K.5n(K.4d+1)},9o:L(a){K.3f.1o(".4e, .7k").2a();1H(M b=0;a>b;b++)K.3f.14($("<13>").W("4e").1J(b+1));1H(M c=K.N.2x,d=a%c?c-a%c:0,b=0;d>b;b++)K.3f.14($("<13>").W("7k"));K.4G.1o(".4e, 7k").2m("7i").d4().W("7i"),K.3D=a,K.2h()},17:L(){K.U.17()},V:L(){K.U.V()},1W:L(){K.3I.W("9G")},1d:L(){K.3I.2m("9G")}},J.2k={2t:L(){11($(1p.3g).14(K.U=$("<13>").W("d5").14(K.71=$("<13>").W("d6").V().14(K.7l=$("<13>").W("7m d7").1c("2M","21").14($("<13>").W("3v").14(K.7n=$("<9H>")))).14(K.5o=$("<13>").W("7m d8").14($("<13>").W("3v"))).14(K.7o=$("<13>").W("7m d9").1c("2M","1U").14($("<13>").W("3v").14(K.7p=$("<9H>"))))).V()).14(K.1Q=$("<13>").W("9r").14(K.4D=$("<13>").W("9s")).V()),1h.1D&&1h.1D<7){M a=K.U[0].4k;a.Y="3U",a.4X("19",\'((!!1w.2c && 2c(1w).3l()) || 0) + "1a"\');M b=K.1Q[0].4k;b.Y="3U",b.4X("19",\'((!!1w.2c && 2c(1w).3l()) || 0) + "1a"\')}K.2V(),K.3A()},2V:L(){K.N=$.1k({24:!0,6j:{21:"da",1U:"db"},1Q:!0},P.N&&P.N.1i||{}),K.9I()},3W:L(a){M b={U:"dc",1Q:"9t"};$.1t(b,$.Z(L(b,c){M d=K[b];$.1t((d[0].6N||"").2D(" "),L(a,b){b.2Q(c)>-1&&d.2m(b)}),d.W(c+a)},K))},9I:L(){K.7n.V(),K.7p.V(),K.N.6j&&(K.7n.1J(K.N.6j.21).17(),K.7p.1J(K.N.6j.1U).17())},3A:L(){K.7l.1O("2g",L(){P.1d(),P.21(),$(K).38()}),K.5o.1O("2g",L(){$(K).1o(".4H").1e>0||P[P.1f.1s("3E")?"1d":"1W"](!0)}),K.7o.1O("2g",L(){P.1d(),P.1U(),$(K).38()}),K.4D.1O("2g",L(){P.V()}),K.U.1B(K.1Q).1O("1C:2b",$.Z(L(a){(!P.N||!P.N.2b||P.N&&P.N.26)&&(a.2P(),a.2O())},K))},17:L(){M a=K.U,b=P.N.1i,c=b&&b.1Q;2J(c){1y"19":a=a.1B(K.1Q);2l;1y"5j":a=a.1B(P.3b)}a.17()},V:L(){K.U.V(),K.1Q.V()},2h:L(){K.2V(),K.U.1o(".4H").2m("4H"),P.5b()||K.7l.1o(".3v").W("4H"),P.N.24||K.5o.1o(".3v").W("4H"),P.5c()||K.7o.1o(".3v").W("4H"),K.U.2m("9J");M a=P.1r&&$.9C(P.1r,L(a){S a.N.24}).1e>0;a&&K.U.W("9J"),K.U["19"==J.T&&P.1r.1e>1?"17":"V"](),K[P.1f.1s("3E")?"1W":"1d"]()},1W:L(){K.5o.W("9K")},1d:L(){K.5o.2m("9K")}},P.4z=L(){L a(){$(1p.3g).14($(1p.3j("13")).W("dd").14($("<13>").W("5U").14(K.7q=$("<13>").W("5V"))))}L b(a){S{Q:$(a).4V(),R:$(a).4n()}}L c(a){M c=b(a),d=a.5C;S d&&$(d).X({Q:c.Q+"1a"})&&b(a).R>c.R&&c.Q++,$(d).X({Q:"2I%"}),c}L d(a,b,c){K.7q||K.4p(),$.1k({22:!1},1N[3]||{}),(b.N.4h||2p.6v(a))&&(b.N.4h&&"2q"==$.T(a)&&(a=$("#"+a)[0]),!P.49&&a&&2p.U.7B(a)&&($(a).1c("8U",$(a).X("8V")),P.49=1p.3j("13"),$(a).43($(P.49).V())));M e=1p.3j("13");K.7q.14($(e).W("57").14(a)),2p.6v(a)&&$(a).17(),b.N.69&&$(e).W(b.N.69),b.N.1L&&$(e).W("8Y"+b.N.1L);M f=$(e).1o("5s[2w]").6b(L(){S!($(K).1M("R")&&$(K).1M("Q"))});11(f.1e>0){P.1f.1j("3r",!0);M g=0,h=b.1n,i=15.2f(de,df*(f.1e||0));P.28.2n("3r"),P.28.1j("3r",$.Z(L(){f.1t(L(){K.34=L(){}}),g>=f.1e||P.12&&P.12.1n!=h||K.5g(e,b,c)},K),i),P.1f.1j("3r",f),$.1t(f,$.Z(L(a,d){M i=2y 7a;i.34=$.Z(L(){i.34=L(){};M a=i.Q,j=i.R,k=$(d).1M("Q"),l=$(d).1M("R");11(k&&l||(!k&&l?(a=15.2j(l*a/j),j=l):!l&&k&&(j=15.2j(k*j/a),a=k),$(d).1M({Q:a,R:j})),g++,g==f.1e){11(P.28.2n("3r"),P.1f.1j("3r",!1),P.12&&P.12.1n!=h)S;K.5g(e,b,c)}},K),i.2w=d.2w},K))}2E K.5g(e,b,c)}L e(a,b,d){M e=c(a);e=f(a,e,b),P.41(e.Q,e.R,{33:L(){P.1l.1J(a),d&&d()}})}L f(a,b,d){M e={Q:b.Q-(1X($(a).X("2A-1b"))||0)-(1X($(a).X("2A-5f"))||0),R:b.R-(1X($(a).X("2A-19"))||0)-(1X($(a).X("2A-dg"))||0)},f=P.N.Q;11(f&&"2z"==$.T(f)&&e.Q>f&&($(a).X({Q:f+"1a"}),b=c(a)),b=P.1u.4a(b,d),/(4h|2G|1J)/.5u(d.T)&&P.1f.1s("40")){M g=$("<13>");g.X({Y:"3U",19:0,1b:0,Q:"2I%",R:"2I%"}),$(a).14(g);M h=g.4V();$(a).X(1a(b)).X({dh:"31"});M i=g.4V(),j=h-i;j&&(b.Q+=j,$(a).X(1a(b)),b=P.1u.4a(b,d)),g.2a()}S b}S{4p:a,3m:d,5g:e,8o:f,8n:c}}(),$.1k(!0,1z,L(){L 17(d){M e=1N[1]||{},Y=1N[2];1N[1]&&"2z"==$.T(1N[1])&&(Y=1N[1],e=G.2t({}));M f=[],9L;2J(9L=$.T(d)){1y"2q":1y"4C":M g=2y 4f(d,e);11(g.3s){11(d&&1==d.5B){M h=$(\'.1C[1c-1C-3s="\'+$(d).1c("1C-3s")+\'"]\'),j={};h.6b("[1c-1C-3s-N]").1t(L(i,a){$.1k(j,77("({"+($(a).1M("1c-1C-3s-N")||"")+"})"))}),h.1t(L(a,b){Y||b!=d||(Y=a+1),f.3e(2y 4f(b,$.1k({},j,e)))})}}2E{M j={};d&&1==d.5B&&$(d).1T("[1c-1C-3s-N]")&&($.1k(j,77("({"+($(d).1M("1c-1C-3s-N")||"")+"})")),g=2y 4f(d,$.1k({},j,e))),f.3e(g)}2l;1y"di":$.1t(d,L(a,b){M c=2y 4f(b,e);f.3e(c)})}(!Y||1>Y)&&(Y=1),Y>f.1e&&(Y=f.1e),P.4A(f,Y,{6Y:!0}),P.17(L(){P.2i(Y)})}L 2h(){S P.2h(),K}L 4Y(a){S P.4Y(a),K}L V(){S P.V(),K}L 1W(a){S P.1W(a),K}L 1d(){S P.1d(),K}S{17:17,V:V,1W:1W,1d:1d,2h:2h,4Y:4Y}}()),D.1z=1z,$(1p).7I(L(){1z.2S()})}(2c,1w);',62,825,'||||||||||||||||||||||||||||||||||||||||||||||this|function|var|options||Window|width|height|return|type|element|hide|addClass|css|position|proxy||if|view|div|append|Math||show||top|px|left|data|stop|length|States|dimensions|Browser|controls|set|extend|content|null|url|find|document|shadow|views|get|each|Dimensions|effects|window|opacity|case|Lightview|radius|add|lightview|IE|cache|queue|_m|for|radian|html|image|skin|attr|arguments|bind|visible|close|border|thumbnails|is|next|titleCaption|play|parseInt|color|caption|_dimensions|previous|spinner|thumbnail|slideshow||viewport||Timeouts|ceil|remove|mousewheel|jQuery||size|max|click|refresh|setPosition|round|Top|break|removeClass|clear|lineTo|_|string|background|slider|create|spacing|title|src|items|new|number|padding|bubble|105|split|else|canvas|ajax|slide|100|switch|Thumbnails|fadeTo|side|deepExtendClone|stopPropagation|preventDefault|indexOf|Spinners|init|overlay|arc|setOptions|sfcc|clone|Overlay|Canvas|sideButtonsUnderneath|auto||complete|onload|target|offset||blur||getLayout|buttonTopClose|Relative|spinnerWrapper|push|slider_slide|body|MobileSafari|support|createElement|resize|scrollTop|update|innerPreviousNextOverlays|lv_button|116|pos|preloading_images|group|enabled|Slider|lv_icon|180|children|charAt|lv_side_buttons_underneath|startObserving|margin|duration|count|playing|lv_thumbnail|setActive|itemCount|slider_slideshow|in|tag|quicktime|void|scripts|call|Color|hex2fill|moveTo|vertical|draw|absolute|fadeOut|setSkin|delegate|111|101|resized|resizeTo|_reset|before|visibility||||inlineContent|inlineMarker|fit|outerWidth|elements|page|lv_slider_number|View|initialize|inline|try|catch|style|Skins|icon|innerHeight|scrollLeft|build|queues|vars|canvasShadow|canvasBubble|lv_side_left|lv_side_button|lv_side_right|114|outer|updateQueue|load|getSurroundingIndexes|object|close_button|extension|preloaded|slider_numbers|lv_icon_disabled|flash|iframe|substr|replace|documentElement|Chrome|required|available|plugins|center|getContext|defaultSkin|fillStyle|innerWidth|horizontal|setExpression|setDefaultSkin|lv_side||lv_inner_previous_next_overlays|first|110|115||layout|lv_content_wrapper||animate|floor|mayPrevious|mayNext|refreshPreviousNext|overlapping|right|_update|delete|keyCode|relative|slider_previous|slider_next|nr_width|scrollToPage|middle_slideshow|PI|apply|warn|img|param|test|deepExtend|toLowerCase|_interval|originalEvent|easing|prototype|nodeType|parentNode|parseFloat|WebKit|navigator|name|G_vmlCanvasManager|000|substring|fill|x1|y1|x2|y2|setOpacity|durations|scroll|150|showhide|lv_window|lv_content|lv_button_inner_previous_overlay|lv_button_inner_next_overlay|ctxBubble|108|112|scale|inner|place|controls_type_changed|preload|value|after|stopQueues|wrapperClass|scaleWithin|filter|params|min|track|loading|_urls|lv_thumbnail_image|pageCount|text|console|createHTML|inArray|RegExp|detectType|detectExtension|match|lifetime|iteration|fail|pow|isElement|Opera|opera|version|Requirements|swfobject|check|join|QuickTime|sides|delay|drawRoundedRectangle|expand|closePath|createFillStyle|_adjust|prepend|setVars|className|lv_spinner_wrapper|ctxShadow|closest|104|118|_pinchZoomed|_drawBackgroundPath|fromSpacingX|fromSpacingY|fromPadding|initialDimensionsOnly|once|inherit|middle|cleanContent|disable|getDimensions|setTitleCaption|_states|eval|fetchOptions|getKeyByKeyCode|Image|Cache|Loading|_skin|_loading_images|lv_load_thumbnail|lv_slider_icon|lv_slider_slideshow_disabled|lv_slider_number_last|refreshButtonStates|lv_slider_number_empty|middle_previous|lv_top_button|text_previous|middle_next|text_next|container|String|base|constructor|domain|3e5|clearInterval|wheelDelta|120|detail|Array|isAttached|AppleWebKit|Gecko|getUniqueID|SWFObject|Za|notified|ready|map|ShockwaveFlash|prefix|toUpperCase|createEvent|boxShadow|borderRadius|boolean|red|green|blue|undefined|fff|devicePixelRatio|beginPath|fillRect|Gradient|addColorStops|dPA|1e3|lv_skin|lv_shadow|close_lightview|applyFixes|stopObserving|lv_side_button_|lv_side_button_out|109|107|117|103|scrolling|resizing|undelegate|clearRect|_drawBorderPath|_drawShadow|firstChild|lv_blank_background|25000px|getMeasureElementDimensions|getFittedDimensions|controls_from_spacing_x|toSpacingX|sxDiff|controls_from_spacing_y|toSpacingY|syDiff|controls_from_padding|toPadding|pDiff|step|easeInOutQuart|removeAttr|getPlacement|lv|fx|placement|onHide|setInitialDimensions|onShow|preloadSurroundingImages|continuous|hideOverlapping|embed|wmode|transparent|restoreOverlapping|restoreOverlappingWithinContent|_show|_hide|createSpinner|restoreInlineContent|lv_restore_inline_display|display|lv_has_caption|lv_has_title|lv_content_|121||errors|pluginspage|pluginspages|lv_content_image||controller||||SetControllerVisible|dataType|afterUpdate|enable|measureElement|timeout_|clearTimeout|href|isExternal|getBoundsScale|space|esc|onkeydown|onkeyup|populate|lv_thumbnails|lv_thumbnails_slider|lv_controls_top_close|lv_controls_top_close_button|lv_controls_top_close_skin_|stopLoadingImages|_getThumbnailsWithinViewport|loadThumbnailsWithinViewport|adjustToViewport|lv_thumbnail_active|lv_slider_next|Page|nr_margin_last|grep|lv_slider_number_active|lv_slider_next_disabled|lv_slider_previous_disabled|lv_slider_slideshow_playing|span|setText|lv_controls_top_with_slideshow|lv_top_slideshow_playing|object_type|pyth|sqrt|degrees|fromCharCode|log|area|basefont|col|frame|hr|input|link|isindex|meta|range|spacer|wbr|Object|extensions|deferUntil|setInterval|Event|trigger|isPropagationStopped|isDefaultPrevented|DOMMouseScroll|Quart|easeIn|easeOut|easeInOut|slice|exec|attachEvent|MSIE|KHTML|rv|Apple|Mobile|Safari|userAgent|lv_identity_|getElementById|fn||jquery|ua|Version|z_|z0|requires|ActiveXObject|Shockwave|Flash|init_|Webkit|Moz|ms|Khtml|touch|TouchEvent|transitions|WebKitTransitionEvent|TransitionEvent|OTransitionEvent|expressions|prefixed|initialTypeOptions|reset|rgba|255|360|hue|saturation|brightness|0123456789abcdef|hex2rgb|getSaturatedBW|initElement|mergedCorner|toFixed|isArray|createLinearGradient|05|addColorStop|inside|lv_overlay|533|dark|lv_window_|lv_bubble|lv_side_button_previous|lv_side_button_next|lv_title_caption|titleCaptionSlide|lv_title_caption_slide|lv_title|lv_caption|lv_button_top_close|none|about|blank|fixed|mouseover||touchmove|mouseout|102|106|119|addEventListener|gesturechange|200|orientationchange|lv_close|15000px|lvresizecount|initialDimensions|select|hidden|tagName|Stop|innerHTML|default|122|1e5|00006000600660060060666060060606666060606|00006000606000060060060060060606000060606|00006000606066066660060060060606666060606|00006000606006060060060060060606000060606|000066606006600600600600066006066660066600000|1800|missing_plugin|gif|progid|DXImageTransform|Microsoft|AlphaImageLoader|sizingMethod|alt|id|embedSWF|flashvars|lv_content_flash|class|lv_content_object|merge|codebase|http|www|apple|com|qtactivex|qtplugin|cab|classid|clsid|02BF25D5|8C17|4B23|BC80|D3488ABDDC6B|video|iframe_movie|frameBorder|hspace|lv_content_iframe|lv_content_html|success|responseText|9999999|outerHeight|270|cos|setTimeout|isMedia|scaleToBounds|keydown|keyup|keyboard|callback|inject|currentTarget|lv_button_top_close_controls_type_|lv_thumbnails_slide|offsetHeight|lv_thumbnails_skin_|lv_thumbnail_icon|lv_thumbnail_icon_|lv_thumbnail_image_spinner_overlay|_previous|_next|lv_controls_relative|lv_slider|lv_slider_previous|lv_slider_numbers|lv_slider_slide|lv_slider_slideshow|slider_|hasClass|makeArray|999|linear|previousPage|nextPage|last|lv_controls_top|lv_top_middle|lv_top_previous|lv_top_slideshow|lv_top_next|Prev|Next|lv_controls_top_skin_|lv_update_queue|8e3|750|bottom|overflow|array'.split('|'),0,{}));
/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/

typeof Muse=="undefined"&&(Muse={});Muse.Redirect={};Muse.Redirect.domPrefixes=["Webkit","Moz","O","ms","Khtml"];Muse.Redirect.Touch=function(){if(navigator.maxTouchPoints>1)return!0;for(var a=0,b=Muse.Redirect.domPrefixes.length;a<b;a++){var c=Muse.Redirect.domPrefixes[a]+"MaxTouchPoints";if(c in navigator&&navigator[c])return!0}try{return document.createEvent("TouchEvent"),!0}catch(d){}return!1}();
Muse.Redirect.readCookie=function(a){a+="=";for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)==0)return d.substring(a.length,d.length)}return null};
Muse.Redirect.redirect=function(a,b,c,d){var f=null,g=Muse.Redirect.readCookie("devicelock"),k=Muse.Redirect.readCookie("inbrowserediting")=="true";k||(g=="phone"&&c?f=c:g=="tablet"&&b&&(f=b));!k&&g!=a&&f==null&&(d?d=="phone"&&c?f=c:d=="tablet"&&b&&(f=b):(a=Math.min(screen.width,screen.height)/(window.devicePixelRatio||1),d=window.screen.systemXDPI||0,g=window.screen.systemYDPI||0,d=d>0&&g>0?Math.min(screen.width/d,screen.height/g):0,(a<=370||d!=0&&d<=3)&&c?f=c:a<=960&&b&&Muse.Redirect.Touch&&(f=
b)));if(f!=null)document.location=f,document.write('<style type="text/css">body {visibility:hidden}</style>')};
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"museredirect.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("museredirect.js");break}}}}})();
/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2012 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/

(function(a,b,c,d,f){c.Plugins.SlideShowCaptions={defaultOptions:{captionClassName:"SSSlideCaption"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d._attachBehavior(b)})},_attachBehavior:function(a){var b=a._findWidgetElements("."+a.options.captionClassName);if(b.length)a._sscpCaptions=b,b.css("display","none"),a.slides.bind("wp-panel-show",function(a,c){b.eq(c.panelIndex).css("display","block")}),a.slides.bind("wp-panel-hide",
function(a,c){b.eq(c.panelIndex).css("display","none")}),a.bind("ready",function(){-1!=a.slides.activeIndex&&b.eq(a.slides.activeIndex).css("display","block")})}};c.Plugins.SlideShowLabel={defaultOptions:{labelClassName:"SlideShowLabel"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d._attachBehavior(b)})},_attachBehavior:function(a){var b=this,c=a._findWidgetElements("."+a.options.labelClassName);if(c.length)a._$sslpLabels=c,a.slides.bind("wp-panel-show",
function(){b._updateLabels(a)}),a.bind("ready",function(){b._updateLabels(a)})},_findAllTextNodes:function(a,b){b=b||[];switch(a.nodeType){case 3:b.push(a);break;case 1:if(a.nodeName.toLowerCase()!=="script")for(var c=a.firstChild;c;)this._findAllTextNodes(c,b),c=c.nextSibling}a.nextSibling&&this._findAllTextNodes(a.nextSibling,b);return b},_updateLabels:function(a){var b=this,c=a.slides,d=c.activeIndex+1,f=c.$element.length;a._$sslpLabels.each(function(){for(var a=b._findAllTextNodes(this),c=a.length,
g=0,h=function(a){return++g===1?d:g===2?f:a},q=0;q<c;q++){var m=a[q],r=m.nodeValue,t=r.replace(/\d+/g,h);if(t!==r)m.nodeValue=t}})}};c.Plugins.Lightbox={defaultOptions:{lightboxPartsSelector:".PamphletLightboxPart",closeBtnClassName:"PamphletCloseButton"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b._sslbpAutoPlay=c.autoPlay;c.autoPlay=!1;b.bind("before-transform-markup",function(){d._beforeTransformMarkup(b)});b.bind("attach-behavior",function(){d._attachBehavior(b)})},
_beforeTransformMarkup:function(a){a._sslbpShownInitially=!0;var b=a._findWidgetElements("."+a.options.slideClassName);if(b.filter(":hidden").length==0)a._sslbpSlideOffset=b.offset();else{a._sslbpShownInitially=!1;var d=a._findWidgetElements("."+a.options.viewClassName);a._sslbpSlideOffset={top:c.Utils.getCSSIntValue(d,"top")+c.Utils.getCSSIntValue(b,"top"),left:c.Utils.getCSSIntValue(d,"left")+c.Utils.getCSSIntValue(b,"left")}}},_attachBehavior:function(a){var b=this,d=a.options;a.tabs.$element.bind(d.event,
function(){b._openLightbox(a)});a.slides.bind("wp-panel-before-show",function(){b._openLightbox(a)});if(c.Browser.Features.Touch&&d.elastic==="fullScreen")a.slides.$element.not("a[href]").on("click",function(){b._closeLightbox(a)});a._$sslbpCloseBtn=a._findWidgetElements("."+d.closeBtnClassName).bind("click",function(){b._closeLightbox(a)});b._initializeMarkup(a)},_initializeMarkup:function(b){var d=b.options,f=d.elastic!=="off",l=b._findWidgetElements("."+d.viewClassName),j=b.slides.$element,i=l,
n=b._sslbpSlideOffset,o=j.outerWidth(),p=j.outerHeight(),q=b._findWidgetElements(d.lightboxPartsSelector),i=a(l[0].parentNode).filter("."+d.clipClassName);i.length===0&&(i=l);q.each(function(d,k){var i=a(k);if(i.css("position")!=="fixed"){var j=b._sslbpShownInitially?i.offset():{top:c.Utils.getCSSIntValue(i,"top"),left:c.Utils.getCSSIntValue(i,"left")},l={top:j.top-n.top};if(!f)l.left=j.left-n.left;i.css(l)}}).addClass("popup_element");var m=a('<div id="'+(l.attr("id")||"")+'"></div>').css({left:0,
top:0,width:"auto",height:"auto",padding:0,margin:0,zIndex:"auto"}),r;f&&(r=a("<div/>"),d.elastic==="fullScreen"?r.addClass("fullscreen"):d.elastic==="fullWidth"&&r.addClass("fullwidth"),r.css({paddingLeft:l.css("padding-left"),paddingRight:l.css("padding-right"),paddingTop:l.css("padding-top"),paddingBottom:l.css("padding-bottom"),borderColor:l.css("border-left-color"),borderStyle:l.css("border-left-style"),borderLeftWidth:l.css("border-left-width"),borderRightWidth:l.css("border-right-width"),borderTopWidth:l.css("border-top-width"),
borderBottomWidth:l.css("border-bottom-width")}),r.append(i),r.append(q),m.css({border:"none"}));l.removeAttr("id");var t=a("<div class='overlayWedge'></div>").insertBefore(j[0]);m.append(l.children().not("."+d.slideClassName));l.append(j);m.css({visibility:"hidden"}).appendTo(document.body);var l=m.outerWidth(),x=m.outerHeight();m.detach().css({visibility:""});i.css({position:d.elastic==="fullScreen"?"relative":"absolute",padding:0,left:d.elastic==="fullWidth"?"":0,top:0,borderWidth:0,background:"none"});
d.elastic!=="fullScreen"&&i.css({width:o,height:p});d.transitionStyle==="fading"&&j.css({position:"absolute",left:0,top:0});var y;if(b._fstpPositionSlides||b._csspResizeFullScreenImages)y=function(a,c){b._fstpPositionSlides&&b._fstpPositionSlides(a,c);b._csspResizeFullScreenImages&&b._csspResizeFullScreenImages(b,b.slides.$element,d.heroFitting)};j=-o/2;p=-p/2;i=a("<div class='LightboxContent'></div>").css({position:"absolute"}).append(f?r:i);f||i.append(q);i.museOverlay({autoOpen:!1,offsetLeft:j,
offsetTop:p,overlayExtraWidth:l,overlayExtraHeight:x,$overlaySlice:m,$overlayWedge:t,onClose:function(){b.stop();b.slides.hidePanel(b.slides.activeElement)},$elasticContent:r,resizeSlidesFn:y});if(a.browser.msie&&a.browser.version<9){var F=m[0];c.Utils.needPIE(function(){PIE.detach(F);PIE.attach(F)})}b._$sslbpOverlay=i},_openLightbox:function(a){var b=a._$sslbpOverlay;b.data("museOverlay").isOpen||(b.museOverlay("open"),a._sslbpAutoPlay&&a.play())},_closeLightbox:function(a){a._$sslbpOverlay.data("museOverlay").isOpen&&
a._$sslbpOverlay.museOverlay("close")}};c.Plugins.ContentSlideShow={defaultOptions:{displayInterval:3E3,transitionDuration:500,transitionStyle:"fading",contentLayout_runtime:"stack",event:"click",deactivationEvent:"none",hideAllContentsFirst:!1,shuffle:!1,resumeAutoplay:!1,resumeAutoplayInterval:3E3,elastic:"off"},slideShowOverrides:{slideshowClassName:"SlideShowWidget",viewClassName:"SlideShowContentPanel",slideClassName:"SSSlide",slideLinksClassName:"SSSlideLinks",slideLinkClassName:"SSSlideLink",
slideLinkActiveClassName:"SSSlideLinkSelected",slideCountClassName:"SSSlideCount",firstBtnClassName:"SSFirstButton",lastBtnClassName:"SSLastButton",prevBtnClassName:"SSPreviousButton",nextBtnClassName:"SSNextButton",playBtnClassName:"SSPlayButton",stopBtnClassName:"SSStopButton",closeBtnClassName:"SSCloseButton",heroFitting:"fitContentProportionally",thumbFitting:"fillFrameProportionally",lightboxPartsSelector:".SlideShowCaptionPanel, .SSFirstButton, .SSPreviousButton, .SSNextButton, .SSLastButton, .SlideShowLabel, .SSCloseButton",
lightboxEnabled_runtime:!1},compositionOverrides:{slideshowClassName:"PamphletWidget",viewClassName:"ContainerGroup",slideClassName:"Container",slideLinkClassName:"Thumb",slideLinkActiveClassName:"PamphletThumbSelected",prevBtnClassName:"PamphletPrevButton",nextBtnClassName:"PamphletNextButton",closeBtnClassName:"PamphletCloseButton",lightboxPartsSelector:".PamphletLightboxPart"},initialize:function(d,f){var h=this,l=d.$element.hasClass("SlideShowWidget"),j=l?h.slideShowOverrides:h.compositionOverrides;
d._csspIsImageSlideShow=l;this._restartTimer=0;a.extend(f,a.extend({},h.defaultOptions,j,f));if(f.lightboxEnabled_runtime)f.contentLayout_runtime="lightbox";if(f.contentLayout_runtime=="lightbox")f.hideAllContentsFirst=!0;if(f.hideAllContentsFirst)f.defaultIndex=-1;if(f.elastic!=="off")d._csspPositionImage=h._positionImage;l&&(b.Widget.ContentSlideShow.slideImageIncludePlugin.initialize(d,f),c.Plugins.SlideShowLabel.initialize(d,f),c.Plugins.SlideShowCaptions.initialize(d,f));f.transitionStyle=="fading"?
b.Widget.ContentSlideShow.fadingTransitionPlugin.initialize(d,f):c.Browser.Features.Touch&&f.enableSwipe===!0?b.Widget.ContentSlideShow.swipeTransitionPlugin.initialize(d,f):b.Widget.ContentSlideShow.filmstripTransitionPlugin.initialize(d,f);b.Widget.ContentSlideShow.alignPartsToPagePlugin.initialize(d,f);if(f.contentLayout_runtime==="lightbox"){if(f.elastic!=="off")d._csspResizeFullScreenImages=h._resizeFullScreenImages;c.Plugins.Lightbox.initialize(d,f)}f.shuffle===!0&&b.Widget.ContentSlideShow.shufflePlayPlugin.initialize(d,
f);d.bind("transform-markup",function(){h._transformMarkup(d)});d.bind("attach-behavior",function(){h._attachBehavior(d)})},_transformMarkup:function(b){var d=b.options,f=b._findWidgetElements("."+d.viewClassName);if(d.transitionStyle!=="fading"){var l=a('<div class="'+d.clipClassName+'"/>'),j=b._findWidgetElements("."+d.slideClassName),b=j.outerWidth(),j=j.outerHeight();if(d.elastic==="fullScreen")l.addClass("fullscreen");else{var i={position:"relative",width:b+"px",height:j+"px",overflow:"hidden"},
n=f.css("position");if(n==="absolute")i.position=n,i.left=f.css("left"),i.top=f.css("top");else if(n==="fixed"){var o=c.Utils.getStyleSheetRuleById(c.Utils.getPageStyleSheet(),f.get(0).id);i.position=n;i.left=c.Utils.getRuleProperty(o,"left");i.top=c.Utils.getRuleProperty(o,"top");i.bottom=c.Utils.getRuleProperty(o,"bottom");i.right=c.Utils.getRuleProperty(o,"right")}l.css(i)}d.elastic!=="fullScreen"&&f.css({width:b+"px",height:j+"px"});f.css({position:"relative",top:"0",left:"0",margin:"0",overflow:"hidden"}).wrap(l)}else n=
f.css("position"),d.elastic!=="fullScreen"&&n!=="fixed"&&f.css({width:"0",height:"0"})},_attachBehavior:function(b){var f=this,h=b.options,l=b.tabs,j=b.slides.$element,i=h.slideLinkActiveClassName,n=h.contentLayout_runtime==="lightbox";if(h.elastic!=="off"&&(f._resizeFullScreenImages(b,b.slides.$element,h.heroFitting),!n))a(d).on("orientationchange resize",function(){f._resizeFullScreenImages(b,b.slides.$element,h.heroFitting)});if(n)h.hideAllContentsFirst=!0;if(l){var o=l.$element;h.event==="mouseover"&&
o.bind("mouseenter",function(){var b=a(this);b.data("enter",!0);l.selectTab(o.index(b))});h.deactivationEvent==="mouseout_trigger"?o.bind("mouseleave",function(){var c=a(this);c.data("enter",!1);b.slides.hidePanel(o.index(c))}):h.deactivationEvent==="mouseout_both"&&(o.bind("mouseleave",function(){var c=a(this),d=o.index(c),f=j.eq(d);c.data("enter",!1);c.data("setTimeout")||(c.data("setTimeout",!0),setTimeout(function(){!f.data("enter")&&!c.data("enter")&&b.slides.hidePanel(d);c.data("setTimeout",
!1)},300))}),j.bind("mouseenter",function(){a(this).data("enter",!0)}),j.bind("mouseleave",function(){var c=a(this),d=j.index(c),f=o.eq(d);c.data("enter",!1);f.data("setTimeout")||(f.data("setTimeout",!0),setTimeout(function(){!c.data("enter")&&!f.data("enter")&&b.slides.hidePanel(d);f.data("setTimeout",!1)},300))}))}l&&i&&(h.hideAllContentsFirst||l.$element.eq(l.options.defaultIndex).addClass(i),b.slides.bind("wp-panel-show",function(a,b){l.$element.eq(b.panelIndex).addClass(i)}).bind("wp-panel-hide",
function(a,b){l.$element.eq(b.panelIndex).removeClass(i)}));f._attachStopOnClickHandler(b,b.$firstBtn);f._attachStopOnClickHandler(b,b.$lastBtn);f._attachStopOnClickHandler(b,b.$previousBtn);f._attachStopOnClickHandler(b,b.$nextBtn);f._attachStopOnClickHandler(b,b.$playBtn);f._attachStopOnClickHandler(b,b.$stopBtn);f._attachStopOnClickHandler(b,b.$closeBtn);l&&!n&&f._attachStopOnClickHandler(b,l.$element);b._csspIsImageSlideShow||(b.slides.bind("wp-panel-hide",function(b,d){c.Utils.detachIframesAndObjectsToPauseMedia(a(d.panel))}).bind("wp-panel-show",
function(d,f){setTimeout(function(){c.Utils.attachIframesAndObjectsToResumeMedia(a(f.panel))},b.options.transitionDuration)}),j.each(function(){this!=b.slides.activeElement||h.hideAllContentsFirst?c.Utils.detachIframesAndObjectsToPauseMedia(a(this)):c.Utils.attachIframesAndObjectsToResumeMedia(a(this))}))},_startRestartTimer:function(a){this._stopRestartTimer();this._restartTimer=setTimeout(function(){a.play(!0)},a.options.resumeAutoplayInterval+a.options.transitionDuration)},_stopRestartTimer:function(){this._restartTimer&&
clearTimeout(this._restartTimer);this._restartTimer=0},_attachStopOnClickHandler:function(a,b){var c=this;b.bind(a.options.event==="click"?"click":"mouseover",function(){a.stop();(a.options.autoPlay||a._sslbpAutoPlay)&&a.options.resumeAutoplay&&0<a.options.resumeAutoplayInterval&&c._startRestartTimer(a)})},_hitTest:function(a,b){b.outerWidth()===0&&(b=b.children(".popup_anchor").children(".popup_element").eq(0));var c=b.offset(),c={x:c.left,y:c.top,width:b.outerWidth(),height:b.outerHeight()};return a.pageX>=
c.x&&a.pageX<=c.x+c.width&&a.pageY>=c.y&&a.pageY<=c.y+c.height},_layoutThumbs:function(b){var d=b.options,f=c.Utils.getStyleValue;b._findWidgetElements("."+d.slideLinksClassName).each(function(){var b=a(this).find("."+d.slideLinkClassName);firstThumb=b[0];tWidth=f(firstThumb,"width");tHeight=f(firstThumb,"height");gapH=f(firstThumb,"margin-right");gapV=f(firstThumb,"margin-bottom");borderL=f(firstThumb,"border-left-width");borderR=f(firstThumb,"border-right-width");borderT=f(firstThumb,"border-top-width");
borderB=f(firstThumb,"border-bottom-width");gWidth=f(this,"width");paddingL=f(this,"padding-left");paddingT=f(this,"padding-top");maxNumThumb=Math.floor((gWidth+gapH)/(tWidth+borderL+borderR+gapH));gStyle=this.runtimeStyle?this.runtimeStyle:this.style;numRow=Math.ceil(b.length/maxNumThumb);firstRowNum=b.length<maxNumThumb?b.length:maxNumThumb;leftPos=leftMostPos=c.Utils.pixelRound((gWidth-(tWidth+borderL+borderR)*firstRowNum-gapH*(firstRowNum-1))/2)+paddingL;topPos=paddingT;numInRow=1;gStyle.height=
(tHeight+borderT+borderB)*numRow+gapV*(numRow-1)+"px";b.each(function(){numInRow>firstRowNum&&(numInRow=1,leftPos=leftMostPos,topPos+=tHeight+borderT+borderB+gapV);numInRow++>1&&(leftPos+=tWidth+borderL+borderR+gapH);var a=this.runtimeStyle?this.runtimeStyle:this.style;a.marginRight="0px";a.marginBottom="0px";a.left=leftPos+"px";a.top=topPos+"px"})})},_resizeFullScreenImages:function(b,c,d){c.each(function(){a(this).find("img").each(function(){this.complete&&!a(this).hasClass(b.options.imageIncludeClassName)&&
b._csspPositionImage(this,d,b.options.elastic)})})},_setupImagePositioning:function(b,c,d,f){var j=this;c.each(function(){a(this).find("img").each(function(){var b=this;b.complete?j._positionImage(b,d,f):a(b).load(function(){j._positionImage(b,d,f)})})})},_positionImage:function(b,k,h,l,j){var i=a(d),n=b.runtimeStyle?b.runtimeStyle:b.style,o=h==="fullWidth"||h==="fullScreen",p=h==="fullHeight"||h==="fullScreen",q=k=="fitContentProportionally";$img=a(b);o=o?d.innerWidth?d.innerWidth:i.width():q?$img.data("width"):
$img.parent().width();i=p?d.innerHeight?d.innerHeight:i.height():q?$img.data("height"):$img.parent().height();l=l!==f?l:c.Utils.getNaturalWidth(b);b=j!==f?j:c.Utils.getNaturalHeight(b);h!=="off"&&(l===0&&(l=$img.data("imageWidth")),b===0&&(b=$img.data("imageHeight")));if(o==l&&i==b)n.marginTop="0px",n.marginLeft="0px";else{p=l;j=b;if(k=="fillFrameProportionally"){if(h!=="off"||l>o&&b>i)k=l/o,h=b/i,k<h?(j=b/k,p=o):(j=i,p=l/h)}else if(k=="fitContentProportionally"&&(h!=="off"||l>o||b>i))k=l/o,h=b/i,
k>h?(j=b/k,p=l/k):(j=b/h,p=l/h);n.width=c.Utils.pixelRound(p)+"px";n.height=c.Utils.pixelRound(j)+"px";n.marginTop=c.Utils.pixelRound((i-j)/2)+"px";n.marginLeft=c.Utils.pixelRound((o-p)/2)+"px"}}};a.extend(b.Widget.ContentSlideShow.slideImageIncludePlugin.defaultOptions,{imageIncludeClassName:"ImageInclude",slideLoadingClassName:"SSSlideLoading"});b.Widget.ContentSlideShow.prototype.defaultPlugins=[c.Plugins.ContentSlideShow];b.Widget.ContentSlideShow.prototype._getAjaxSrcForImage=function(b){for(var c=
a(d).data("ResolutionManager").getDataSrcAttrName(),f=c.length,l,j=0;j<f;j++)if((l=b.data(c[j]))&&l.length)return l;return b.data("src")}})(jQuery,WebPro,Muse,window);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"musewpslideshow.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("musewpslideshow.js");break}}}}})();
/*
PIE: CSS3 rendering for IE
Version 1.0beta5
http://css3pie.com
Dual-licensed for use under the Apache License Version 2.0 or the General Public License (GPL) Version 2.

2013.04.17 change made to PIE.BackgroundRenderer (hideBackground() and destroy()) to fix a bug related to fill images not loading on objects with rounded corners. Copyright (c) 2013 Adobe Systems Incorporated All Rights Reserved.
*/

(function(){var a=document,b=window.PIE;if(!b){b=window.PIE={CSS_PREFIX:"-pie-",STYLE_PREFIX:"Pie",CLASS_PREFIX:"pie_",tableCellTags:{TD:1,TH:1},childlessElements:{TABLE:1,THEAD:1,TBODY:1,TFOOT:1,TR:1,INPUT:1,TEXTAREA:1,SELECT:1,OPTION:1,IMG:1,HR:1},focusableElements:{A:1,INPUT:1,TEXTAREA:1,SELECT:1,BUTTON:1},inputButtonTypes:{submit:1,button:1,reset:1},emptyFn:function(){}};try{a.execCommand("BackgroundImageCache",!1,!0)}catch(d){}(function(){for(var c=4,f=a.createElement("div"),d=f.getElementsByTagName("i");f.innerHTML=
"<\!--[if gt IE "+ ++c+"]><i></i><![endif]--\>",d[0];);b.ieVersion=c;if(c===6)b.CSS_PREFIX=b.CSS_PREFIX.replace(/^-/,"");b.ieDocMode=a.documentMode||b.ieVersion;f.innerHTML='<v:shape adj="1"/>';c=f.firstChild;c.style.behavior="url(#default#VML)";b.supportsVML=typeof c.adj==="object"})();(function(){var c,f=0,d={};b.Util={createVmlElement:function(b){c||(c=a.createDocumentFragment(),c.namespaces.add("css3vml","urn:schemas-microsoft-com:vml"));return c.createElement("css3vml:"+b)},getUID:function(c){return c&&
c._pieId||(c._pieId="_"+ ++f)},merge:function(c){var b,a,f,d,g=arguments;b=1;for(a=g.length;b<a;b++)for(f in d=g[b],d)d.hasOwnProperty(f)&&(c[f]=d[f]);return c},withImageSize:function(c,b,a){var f=d[c],l,m;f?Object.prototype.toString.call(f)==="[object Array]"?f.push([b,a]):b.call(a,f):(m=d[c]=[[b,a]],l=new Image,l.onload=function(){f=d[c]={w:l.width,h:l.height};for(var b=0,a=m.length;b<a;b++)m[b][0].call(m[b][1],f);l.onload=null},l.src=c)}}})();b.GradientUtil={getGradientMetrics:function(c,a,d,i){function h(){n=
k>=90&&k<270?a:0;p=k<180?d:0;o=a-n;q=d-p}function j(){for(;k<0;)k+=360;k%=360}var k=i.angle,i=i.gradientStart,l,m,n,p,o,q,r,s;if(i)i=i.coords(c,a,d),l=i.x,m=i.y;k?(k=k.degrees(),j(),h(),i||(l=n,m=p),i=b.GradientUtil.perpendicularIntersect(l,m,k,o,q),c=i[0],i=i[1]):i?(c=a-l,i=d-m):(l=m=c=0,i=d);r=c-l;s=i-m;k===void 0&&(k=!r?s<0?90:270:!s?r<0?180:0:-Math.atan2(s,r)/Math.PI*180,j(),h());return{angle:k,startX:l,startY:m,endX:c,endY:i,startCornerX:n,startCornerY:p,endCornerX:o,endCornerY:q,deltaX:r,deltaY:s,
lineLength:b.GradientUtil.distance(l,m,c,i)}},perpendicularIntersect:function(c,b,a,d,h){return a===0||a===180?[d,b]:a===90||a===270?[c,h]:(a=Math.tan(-a*Math.PI/180),c=a*c-b,b=-1/a,d=b*d-h,h=b-a,[(d-c)/h,(a*d-b*c)/h])},distance:function(c,b,a,d){c=a-c;b=d-b;return Math.abs(c===0?b:b===0?c:Math.sqrt(c*c+b*b))}};b.Observable=function(){this.observers=[];this.indexes={}};b.Observable.prototype={observe:function(c){var a=b.Util.getUID(c),d=this.indexes,i=this.observers;if(!(a in d))d[a]=i.length,i.push(c)},
unobserve:function(c){var c=b.Util.getUID(c),a=this.indexes;c&&c in a&&(delete this.observers[a[c]],delete a[c])},fire:function(){for(var c=this.observers,b=c.length;b--;)c[b]&&c[b]()}};b.Heartbeat=new b.Observable;b.Heartbeat.run=function(){var c=this;if(!c.running)setInterval(function(){c.fire()},250),c.running=1};(function(){function c(){b.OnUnload.fire();window.detachEvent("onunload",c);window.PIE=null}b.OnUnload=new b.Observable;window.attachEvent("onunload",c);b.OnUnload.attachManagedEvent=
function(c,b,a){c.attachEvent(b,a);this.observe(function(){c.detachEvent(b,a)})}})();b.OnResize=new b.Observable;b.OnUnload.attachManagedEvent(window,"onresize",function(){b.OnResize.fire()});(function(){function c(){b.OnScroll.fire()}b.OnScroll=new b.Observable;b.OnUnload.attachManagedEvent(window,"onscroll",c);b.OnResize.observe(c)})();(function(){var c;b.OnUnload.attachManagedEvent(window,"onbeforeprint",function(){c=b.Element.destroyAll()});b.OnUnload.attachManagedEvent(window,"onafterprint",
function(){if(c){for(var a=0,d=c.length;a<d;a++)b.attach(c[a]);c=0}})})();b.OnMouseup=new b.Observable;b.OnUnload.attachManagedEvent(a,"onmouseup",function(){b.OnMouseup.fire()});b.Length=function(){function c(c){this.val=c}var d=a.createElement("length-calc"),g=a.documentElement,i=d.style,h={},j=["mm","cm","in","pt","pc"],k=j.length,l={};i.position="absolute";i.top=i.left="-9999px";for(g.appendChild(d);k--;)d.style.width="100"+j[k],h[j[k]]=d.offsetWidth/100;g.removeChild(d);d.style.width="1em";c.prototype=
{unitRE:/(px|em|ex|mm|cm|in|pt|pc|%)$/,getNumber:function(){var c=this.num;if(c===void 0)c=this.num=parseFloat(this.val);return c},getUnit:function(){var f;var c=this.unit;if(!c)f=this.unit=(c=this.val.match(this.unitRE))&&c[0]||"px",c=f;return c},isPercentage:function(){return this.getUnit()==="%"},pixels:function(c,b){var a=this.getNumber(),d=this.getUnit();switch(d){case "px":return a;case "%":return a*(typeof b==="function"?b():b)/100;case "em":return a*this.getEmPixels(c);case "ex":return a*
this.getEmPixels(c)/2;default:return a*h[d]}},getEmPixels:function(c){var a=c.currentStyle.fontSize,g,i;return a.indexOf("px")>0?parseFloat(a):c.tagName in b.childlessElements?(i=this,g=c.parentNode,b.getLength(a).pixels(g,function(){return i.getEmPixels(g)})):(c.appendChild(d),a=d.offsetWidth,d.parentNode===c&&c.removeChild(d),a)}};b.getLength=function(b){return l[b]||(l[b]=new c(b))};return c}();b.BgPosition=function(){function c(c){this.tokens=c}var a=b.getLength("50%"),d={top:1,center:1,bottom:1},
i={left:1,center:1,right:1};c.prototype={getValues:function(){if(!this._values){var c=this.tokens,j=c.length,k=b.Tokenizer,l=k.Type,m=b.getLength("0"),l=l.IDENT,m=["left",m,"top",m];j===1&&(c.push(new k.Token(l,"center")),j++);if(j===2)l&(c[0].tokenType|c[1].tokenType)&&c[0].tokenValue in d&&c[1].tokenValue in i&&c.push(c.shift()),c[0].tokenType&l?c[0].tokenValue==="center"?m[1]=a:m[0]=c[0].tokenValue:c[0].isLengthOrPercent()&&(m[1]=b.getLength(c[0].tokenValue)),c[1].tokenType&l?c[1].tokenValue===
"center"?m[3]=a:m[2]=c[1].tokenValue:c[1].isLengthOrPercent()&&(m[3]=b.getLength(c[1].tokenValue));this._values=m}return this._values},coords:function(c,b,a){var d=this.getValues(),f=d[1].pixels(c,b),c=d[3].pixels(c,a);return{x:d[0]==="right"?b-f:f,y:d[2]==="bottom"?a-c:c}}};return c}();b.BgSize=function(){function c(c,b){this.w=c;this.h=b}c.prototype={pixels:function(c,b,a,d,j){var k=this.w,l=this.h,m=b/a;d/=j;k==="contain"?(k=d>m?b:a*d,l=d>m?b/d:a):k==="cover"?(k=d<m?b:a*d,l=d<m?b/d:a):k==="auto"?
(l=l==="auto"?j:l.pixels(c,a),k=l*d):(k=k.pixels(c,b),l=l==="auto"?k/d:l.pixels(c,a));return{w:k,h:l}}};c.DEFAULT=new c("auto","auto");return c}();b.Angle=function(){function c(c){this.val=c}c.prototype={unitRE:/[a-z]+$/i,getUnit:function(){return this._unit||(this._unit=this.val.match(this.unitRE)[0].toLowerCase())},degrees:function(){var c=this._deg,b;if(c===void 0)c=this.getUnit(),b=parseFloat(this.val,10),c=this._deg=c==="deg"?b:c==="rad"?b/Math.PI*180:c==="grad"?b/400*360:c==="turn"?b*360:0;
return c}};return c}();b.Color=function(){function c(c){this.val=c}var a={};c.rgbaRE=/\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d+|\d*\.\d+)\s*\)\s*/;c.names={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"0FF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000",blanchedalmond:"FFEBCD",blue:"00F",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",
crimson:"DC143C",cyan:"0FF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",
fuchsia:"F0F",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgreen:"90EE90",lightgrey:"D3D3D3",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",
lightskyblue:"87CEFA",lightslategray:"789",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"0F0",limegreen:"32CD32",linen:"FAF0E6",magenta:"F0F",maroon:"800000",mediumauqamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370D8",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",
olive:"808000",olivedrab:"688E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"D87093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",red:"F00",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",
snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFF",whitesmoke:"F5F5F5",yellow:"FF0",yellowgreen:"9ACD32"};c.prototype={parse:function(){if(!this._color){var b=this.val,a;if(a=b.match(c.rgbaRE))this._color="rgb("+a[1]+","+a[2]+","+a[3]+")",this._alpha=parseFloat(a[4]);else{if((a=b.toLowerCase())in c.names)b="#"+c.names[a];this._color=b;this._alpha=b==="transparent"?0:1}}},colorValue:function(c){this.parse();
return this._color==="currentColor"?c.currentStyle.color:this._color},alpha:function(){this.parse();return this._alpha}};b.getColor=function(b){return a[b]||(a[b]=new c(b))};return c}();b.Tokenizer=function(){function c(c){this.css=c;this.ch=0;this.tokens=[];this.tokenIndex=0}var a=c.Type={ANGLE:1,CHARACTER:2,COLOR:4,DIMEN:8,FUNCTION:16,IDENT:32,LENGTH:64,NUMBER:128,OPERATOR:256,PERCENT:512,STRING:1024,URL:2048};c.Token=function(c,b){this.tokenType=c;this.tokenValue=b};c.Token.prototype={isLength:function(){return this.tokenType&
a.LENGTH||this.tokenType&a.NUMBER&&this.tokenValue==="0"},isLengthOrPercent:function(){return this.isLength()||this.tokenType&a.PERCENT}};c.prototype={whitespace:/\s/,number:/^[\+\-]?(\d*\.)?\d+/,url:/^url\(\s*("([^"]*)"|'([^']*)'|([!#$%&*-~]*))\s*\)/i,ident:/^\-?[_a-z][\w-]*/i,string:/^("([^"]*)"|'([^']*)')/,operator:/^[\/,]/,hash:/^#[\w]+/,hashColor:/^#([\da-f]{6}|[\da-f]{3})/i,unitTypes:{px:a.LENGTH,em:a.LENGTH,ex:a.LENGTH,mm:a.LENGTH,cm:a.LENGTH,"in":a.LENGTH,pt:a.LENGTH,pc:a.LENGTH,deg:a.ANGLE,
rad:a.ANGLE,grad:a.ANGLE},colorFunctions:{rgb:1,rgba:1,hsl:1,hsla:1},next:function(d){function i(b,a){var f=new c.Token(b,a);d||(n.tokens.push(f),n.tokenIndex++);return f}function h(){n.tokenIndex++;return null}var j,k,l,m,n=this;if(this.tokenIndex<this.tokens.length)return this.tokens[this.tokenIndex++];for(;this.whitespace.test(this.css.charAt(this.ch));)this.ch++;if(this.ch>=this.css.length)return h();k=this.ch;j=this.css.substring(this.ch);l=j.charAt(0);switch(l){case "#":if(m=j.match(this.hashColor))return this.ch+=
m[0].length,i(a.COLOR,m[0]);break;case '"':case "'":if(m=j.match(this.string))return this.ch+=m[0].length,i(a.STRING,m[2]||m[3]||"");break;case "/":case ",":return this.ch++,i(a.OPERATOR,l);case "u":if(m=j.match(this.url))return this.ch+=m[0].length,i(a.URL,m[2]||m[3]||m[4]||"")}if(m=j.match(this.number)){l=m[0];this.ch+=l.length;if(j.charAt(l.length)==="%")return this.ch++,i(a.PERCENT,l+"%");if(m=j.substring(l.length).match(this.ident))return l+=m[0],this.ch+=m[0].length,i(this.unitTypes[m[0].toLowerCase()]||
a.DIMEN,l);return i(a.NUMBER,l)}if(m=j.match(this.ident)){l=m[0];this.ch+=l.length;if(l.toLowerCase()in b.Color.names||l==="currentColor"||l==="transparent")return i(a.COLOR,l);if(j.charAt(l.length)==="("){this.ch++;if(l.toLowerCase()in this.colorFunctions){j=function(c){return c&&c.tokenType&a.NUMBER};m=function(c){return c&&c.tokenType&(a.NUMBER|a.PERCENT)};var p=function(c,b){return c&&c.tokenValue===b},o=function(){return n.next(1)};if((l.charAt(0)==="r"?m(o()):j(o()))&&p(o(),",")&&m(o())&&p(o(),
",")&&m(o())&&(l==="rgb"||l==="hsa"||p(o(),",")&&j(o()))&&p(o(),")"))return i(a.COLOR,this.css.substring(k,this.ch));return h()}return i(a.FUNCTION,l)}return i(a.IDENT,l)}this.ch++;return i(a.CHARACTER,l)},hasNext:function(){var c=this.next();this.prev();return!!c},prev:function(){return this.tokens[this.tokenIndex-- -2]},all:function(){for(;this.next(););return this.tokens},until:function(c,b){for(var a=[],d,f;d=this.next();){if(c(d)){f=!0;this.prev();break}a.push(d)}return b&&!f?null:a}};return c}();
b.BoundsInfo=function(c){this.targetElement=c};b.BoundsInfo.prototype={_locked:0,positionChanged:function(){var c=this._lastBounds,b;return!c||(b=this.getBounds())&&(c.x!==b.x||c.y!==b.y)},sizeChanged:function(){var c=this._lastBounds,b;return!c||(b=this.getBounds())&&(c.w!==b.w||c.h!==b.h)},getLiveBounds:function(){var c=this.targetElement,a=c.getBoundingClientRect(),d=b.ieDocMode===9;return{x:a.left,y:a.top,w:d?c.offsetWidth:a.right-a.left,h:d?c.offsetHeight:a.bottom-a.top}},getBounds:function(){return this._locked?
this._lockedBounds||(this._lockedBounds=this.getLiveBounds()):this.getLiveBounds()},hasBeenQueried:function(){return!!this._lastBounds},lock:function(){++this._locked},unlock:function(){if(!--this._locked){if(this._lockedBounds)this._lastBounds=this._lockedBounds;this._lockedBounds=null}}};(function(){function c(c){var a=b.Util.getUID(c);return function(){if(this._locked){var b=this._lockedValues||(this._lockedValues={});return a in b?b[a]:b[a]=c.call(this)}else return c.call(this)}}b.StyleInfoBase=
{_locked:0,newStyleInfo:function(c){function a(c){this.targetElement=c;this._lastCss=this.getCss()}b.Util.merge(a.prototype,b.StyleInfoBase,c);a._propsCache={};return a},getProps:function(){var c=this.getCss(),b=this.constructor._propsCache;return c?c in b?b[c]:b[c]=this.parseCss(c):null},getCss:c(function(){var c=this.targetElement,a=this.constructor,d=c.style,c=c.currentStyle,h=this.cssProperty,j=this.styleProperty,k=a._prefixedCssProp||(a._prefixedCssProp=b.CSS_PREFIX+h),a=a._prefixedStyleProp||
(a._prefixedStyleProp=b.STYLE_PREFIX+j.charAt(0).toUpperCase()+j.substring(1));return d[a]||c.getAttribute(k)||d[j]||c.getAttribute(h)}),isActive:c(function(){return!!this.getProps()}),changed:c(function(){var c=this.getCss(),b=c!==this._lastCss;this._lastCss=c;return b}),cacheWhenLocked:c,lock:function(){++this._locked},unlock:function(){--this._locked||delete this._lockedValues}}})();b.BackgroundStyleInfo=b.StyleInfoBase.newStyleInfo({cssProperty:b.CSS_PREFIX+"background",styleProperty:b.STYLE_PREFIX+
"Background",attachIdents:{scroll:1,fixed:1,local:1},repeatIdents:{"repeat-x":1,"repeat-y":1,repeat:1,"no-repeat":1},originAndClipIdents:{"padding-box":1,"border-box":1,"content-box":1},positionIdents:{top:1,right:1,bottom:1,left:1,center:1},sizeIdents:{contain:1,cover:1},propertyNames:{CLIP:"backgroundClip",COLOR:"backgroundColor",IMAGE:"backgroundImage",ORIGIN:"backgroundOrigin",POSITION:"backgroundPosition",REPEAT:"backgroundRepeat",SIZE:"backgroundSize"},parseCss:function(c){function a(c){return c&&
c.isLengthOrPercent()||c.tokenType&n&&c.tokenValue in s}function d(c){return c&&(c.isLengthOrPercent()&&b.getLength(c.tokenValue)||c.tokenValue==="auto"&&"auto")}var i=this.targetElement.currentStyle,h,j,k,l=b.Tokenizer.Type,m=l.OPERATOR,n=l.IDENT,p=l.COLOR,o,q,r=0,s=this.positionIdents,w,u,v={bgImages:[]};if(this.getCss3()){h=new b.Tokenizer(c);for(k={};j=h.next();)if(o=j.tokenType,q=j.tokenValue,!k.imgType&&o&l.FUNCTION&&q==="linear-gradient"){w={stops:[],imgType:q};for(u={};j=h.next();){o=j.tokenType;
q=j.tokenValue;if(o&l.CHARACTER&&q===")"){u.color&&w.stops.push(u);w.stops.length>1&&b.Util.merge(k,w);break}if(o&p){if(w.angle||w.gradientStart){j=h.prev();if(j.tokenType!==m)break;h.next()}u={color:b.getColor(q)};j=h.next();j.isLengthOrPercent()?u.offset=b.getLength(j.tokenValue):h.prev()}else if(o&l.ANGLE&&!w.angle&&!u.color&&!w.stops.length)w.angle=new b.Angle(j.tokenValue);else if(a(j)&&!w.gradientStart&&!u.color&&!w.stops.length)h.prev(),w.gradientStart=new b.BgPosition(h.until(function(c){return!a(c)},
!1));else if(o&m&&q===",")u.color&&(w.stops.push(u),u={});else break}}else if(!k.imgType&&o&l.URL)k.imgUrl=q,k.imgType="image";else if(a(j)&&!k.bgPosition)h.prev(),k.bgPosition=new b.BgPosition(h.until(function(c){return!a(c)},!1));else if(o&n)if(q in this.repeatIdents&&!k.imgRepeat)k.imgRepeat=q;else if(q in this.originAndClipIdents&&!k.bgOrigin)k.bgOrigin=q,(j=h.next())&&j.tokenType&n&&j.tokenValue in this.originAndClipIdents?k.bgClip=j.tokenValue:(k.bgClip=q,h.prev());else if(q in this.attachIdents&&
!k.bgAttachment)k.bgAttachment=q;else return null;else if(o&p&&!v.color)v.color=b.getColor(q);else if(o&m&&q==="/"&&!k.bgSize&&k.bgPosition)if(j=h.next(),j.tokenType&n&&j.tokenValue in this.sizeIdents)k.bgSize=new b.BgSize(j.tokenValue);else if(j=d(j))o=d(h.next()),o||(o=j,h.prev()),k.bgSize=new b.BgSize(j,o);else return null;else if(o&m&&q===","&&k.imgType)k.origString=c.substring(r,h.ch-1),r=h.ch,v.bgImages.push(k),k={};else return null;if(k.imgType)k.origString=c.substring(r),v.bgImages.push(k)}else this.withActualBg(b.ieDocMode<
9?function(){var c=this.propertyNames,a=i[c.POSITION+"X"],d=i[c.POSITION+"Y"],f=i[c.IMAGE],g=i[c.COLOR];if(g!=="transparent")v.color=b.getColor(g);if(f!=="none")v.bgImages=[{imgType:"image",imgUrl:(new b.Tokenizer(f)).next().tokenValue,imgRepeat:i[c.REPEAT],bgPosition:new b.BgPosition((new b.Tokenizer(a+" "+d)).all())}]}:function(){var c=this.propertyNames,a=/\s*,\s*/,d=i[c.IMAGE].split(a),f=i[c.COLOR],g,h,j,k,l,m;if(f!=="transparent")v.color=b.getColor(f);if((k=d.length)&&d[0]!=="none"){f=i[c.REPEAT].split(a);
g=i[c.POSITION].split(a);h=i[c.ORIGIN].split(a);j=i[c.CLIP].split(a);c=i[c.SIZE].split(a);v.bgImages=[];for(a=0;a<k;a++)if((l=d[a])&&l!=="none")m=c[a].split(" "),v.bgImages.push({origString:l+" "+f[a]+" "+g[a]+" / "+c[a]+" "+h[a]+" "+j[a],imgType:"image",imgUrl:(new b.Tokenizer(l)).next().tokenValue,imgRepeat:f[a],bgPosition:new b.BgPosition((new b.Tokenizer(g[a])).all()),bgOrigin:h[a],bgClip:j[a],bgSize:new b.BgSize(m[0],m[1])})}});return v.color||v.bgImages[0]?v:null},withActualBg:function(c){var a=
b.ieDocMode>8,d=this.propertyNames,i=this.targetElement.runtimeStyle,h=i[d.IMAGE],j=i[d.COLOR],k=i[d.REPEAT],l,m,n,p;h&&(i[d.IMAGE]="");j&&(i[d.COLOR]="");k&&(i[d.REPEAT]="");a&&(l=i[d.CLIP],m=i[d.ORIGIN],p=i[d.POSITION],n=i[d.SIZE],l&&(i[d.CLIP]=""),m&&(i[d.ORIGIN]=""),p&&(i[d.POSITION]=""),n&&(i[d.SIZE]=""));c=c.call(this);h&&(i[d.IMAGE]=h);j&&(i[d.COLOR]=j);k&&(i[d.REPEAT]=k);a&&(l&&(i[d.CLIP]=l),m&&(i[d.ORIGIN]=m),p&&(i[d.POSITION]=p),n&&(i[d.SIZE]=n));return c},getCss:b.StyleInfoBase.cacheWhenLocked(function(){return this.getCss3()||
this.withActualBg(function(){var c=this.targetElement.currentStyle,b=this.propertyNames;return c[b.COLOR]+" "+c[b.IMAGE]+" "+c[b.REPEAT]+" "+c[b.POSITION+"X"]+" "+c[b.POSITION+"Y"]})}),getCss3:b.StyleInfoBase.cacheWhenLocked(function(){var c=this.targetElement;return c.style[this.styleProperty]||c.currentStyle.getAttribute(this.cssProperty)}),isPngFix:function(){var c=0;if(b.ieVersion<7)c=this.targetElement,c=""+(c.style[b.STYLE_PREFIX+"PngFix"]||c.currentStyle.getAttribute(b.CSS_PREFIX+"png-fix"))===
"true";return c},isActive:b.StyleInfoBase.cacheWhenLocked(function(){return(this.getCss3()||this.isPngFix())&&!!this.getProps()})});b.BorderStyleInfo=b.StyleInfoBase.newStyleInfo({sides:["Top","Right","Bottom","Left"],namedWidths:{thin:"1px",medium:"3px",thick:"5px"},parseCss:function(){var c={},a={},d={},i=!1,h=!0,j=!0,k=!0;this.withActualBorder(function(){var f;for(var l=this.targetElement.currentStyle,m=0,n,p,o,q,r,s,w;m<4;m++)o=this.sides[m],w=o.charAt(0).toLowerCase(),n=a[w]=l["border"+o+"Style"],
p=l["border"+o+"Color"],o=l["border"+o+"Width"],m>0&&(n!==q&&(j=!1),p!==r&&(h=!1),o!==s&&(k=!1)),q=n,r=p,s=o,d[w]=b.getColor(p),f=c[w]=b.getLength(a[w]==="none"?"0":this.namedWidths[o]||o),o=f,o.pixels(this.targetElement)>0&&(i=!0)});return i?{widths:c,styles:a,colors:d,widthsSame:k,colorsSame:h,stylesSame:j}:null},getCss:b.StyleInfoBase.cacheWhenLocked(function(){var c=this.targetElement,a=c.currentStyle,d;c.tagName in b.tableCellTags&&c.offsetParent.currentStyle.borderCollapse==="collapse"||this.withActualBorder(function(){d=
a.borderWidth+"|"+a.borderStyle+"|"+a.borderColor});return d}),withActualBorder:function(c){var b=this.targetElement.runtimeStyle,a=b.borderWidth,d=b.borderColor;if(a)b.borderWidth="";if(d)b.borderColor="";c=c.call(this);if(a)b.borderWidth=a;if(d)b.borderColor=d;return c}});(function(){b.BorderRadiusStyleInfo=b.StyleInfoBase.newStyleInfo({cssProperty:"border-radius",styleProperty:"borderRadius",parseCss:function(c){var a=null,d,h,j,k,l=!1;if(c){h=new b.Tokenizer(c);var m=function(){for(var c=[],a;(j=
h.next())&&j.isLengthOrPercent();){k=b.getLength(j.tokenValue);a=k.getNumber();if(a<0)return null;a>0&&(l=!0);c.push(k)}return c.length>0&&c.length<5?{tl:c[0],tr:c[1]||c[0],br:c[2]||c[0],bl:c[3]||c[1]||c[0]}:null};if(c=m())j?j.tokenType&b.Tokenizer.Type.OPERATOR&&j.tokenValue==="/"&&(d=m()):d=c,l&&c&&d&&(a={x:c,y:d})}return a}});var c=b.getLength("0"),c={tl:c,tr:c,br:c,bl:c};b.BorderRadiusStyleInfo.ALL_ZERO={x:c,y:c}})();b.BorderImageStyleInfo=b.StyleInfoBase.newStyleInfo({cssProperty:"border-image",
styleProperty:"borderImage",repeatIdents:{stretch:1,round:1,repeat:1,space:1},parseCss:function(c){var a=null,d,i,h,j,k,l,m=0,n=b.Tokenizer.Type,p=n.IDENT,o=n.NUMBER,q=n.PERCENT;if(c){d=new b.Tokenizer(c);for(var a={},r=function(c){return c&&c.tokenType&n.OPERATOR&&c.tokenValue==="/"},s=function(c){return c&&c.tokenType&p&&c.tokenValue==="fill"},w=function(){j=d.until(function(c){return!(c.tokenType&(o|q))});s(d.next())&&!a.fill?a.fill=!0:d.prev();r(d.next())?(m++,k=d.until(function(c){return!c.isLengthOrPercent()&&
!(c.tokenType&p&&c.tokenValue==="auto")}),r(d.next())&&(m++,l=d.until(function(c){return!c.isLength()}))):d.prev()};c=d.next();)if(i=c.tokenType,h=c.tokenValue,i&(o|q)&&!j)d.prev(),w();else if(s(c)&&!a.fill)a.fill=!0,w();else if(i&p&&this.repeatIdents[h]&&!a.repeat){if(a.repeat={h:h},c=d.next())c.tokenType&p&&this.repeatIdents[c.tokenValue]?a.repeat.v=c.tokenValue:d.prev()}else if(i&n.URL&&!a.src)a.src=h;else return null;if(!a.src||!j||j.length<1||j.length>4||k&&k.length>4||m===1&&k.length<1||l&&
l.length>4||m===2&&l.length<1)return null;if(!a.repeat)a.repeat={h:"stretch"};if(!a.repeat.v)a.repeat.v=a.repeat.h;c=function(c,a){return{t:a(c[0]),r:a(c[1]||c[0]),b:a(c[2]||c[0]),l:a(c[3]||c[1]||c[0])}};a.slice=c(j,function(c){return b.getLength(c.tokenType&o?c.tokenValue+"px":c.tokenValue)});if(k&&k[0])a.widths=c(k,function(c){return c.isLengthOrPercent()?b.getLength(c.tokenValue):c.tokenValue});if(l&&l[0])a.outset=c(l,function(c){return c.isLength()?b.getLength(c.tokenValue):c.tokenValue})}return a}});
b.BoxShadowStyleInfo=b.StyleInfoBase.newStyleInfo({cssProperty:"box-shadow",styleProperty:"boxShadow",parseCss:function(c){var a,d=b.getLength,i=b.Tokenizer.Type,h;if(c){h=new b.Tokenizer(c);a={outset:[],inset:[]};for(c=function(){for(var c,k,l,m,n,p;c=h.next();)if(l=c.tokenValue,k=c.tokenType,k&i.OPERATOR&&l===",")break;else if(c.isLength()&&!n)h.prev(),n=h.until(function(c){return!c.isLength()});else if(k&i.COLOR&&!m)m=l;else if(k&i.IDENT&&l==="inset"&&!p)p=!0;else return!1;c=n&&n.length;if(c>1&&
c<5)return(p?a.inset:a.outset).push({xOffset:d(n[0].tokenValue),yOffset:d(n[1].tokenValue),blur:d(n[2]?n[2].tokenValue:"0"),spread:d(n[3]?n[3].tokenValue:"0"),color:b.getColor(m||"currentColor")}),!0;return!1};c(););}return a&&(a.inset.length||a.outset.length)?a:null}});b.VisibilityStyleInfo=b.StyleInfoBase.newStyleInfo({getCss:b.StyleInfoBase.cacheWhenLocked(function(){var c=this.targetElement.currentStyle;return c.visibility+"|"+c.display}),parseCss:function(){var c=this.targetElement,a=c.runtimeStyle,
c=c.currentStyle,b=a.visibility,d;a.visibility="";d=c.visibility;a.visibility=b;return{visible:d!=="hidden",displayed:c.display!=="none"}},isActive:function(){return!1}});b.RendererBase={newRenderer:function(c){function a(c,b,d,f){this.targetElement=c;this.boundsInfo=b;this.styleInfos=d;this.parent=f}b.Util.merge(a.prototype,b.RendererBase,c);return a},isPositioned:!1,needsUpdate:function(){return!1},prepareUpdate:b.emptyFn,updateProps:function(){this.destroy();this.isActive()&&this.draw()},updatePos:function(){this.isPositioned=
!0},updateSize:function(){this.isActive()?this.draw():this.destroy()},addLayer:function(c,a){this.removeLayer(c);for(var b=this._layers||(this._layers=[]),d=c+1,h=b.length,j;d<h;d++)if(j=b[d])break;b[c]=a;this.getBox().insertBefore(a,j||null)},getLayer:function(c){var a=this._layers;return a&&a[c]||null},removeLayer:function(c){var a=this.getLayer(c),b=this._box;a&&b&&(b.removeChild(a),this._layers[c]=null)},getShape:function(c,d,g,i){var h=this._shapes||(this._shapes={}),j=h[c];if(!j)j=h[c]=b.Util.createVmlElement("shape"),
d&&j.appendChild(j[d]=b.Util.createVmlElement(d)),i&&(g=this.getLayer(i),g||(this.addLayer(i,a.createElement("group"+i)),g=this.getLayer(i))),g.appendChild(j),c=j.style,c.position="absolute",c.left=c.top=0,c.behavior="url(#default#VML)";return j},deleteShape:function(c){var a=this._shapes,b=a&&a[c];b&&(b.parentNode.removeChild(b),delete a[c]);return!!b},getRadiiPixels:function(c){var a=this.targetElement,b=this.boundsInfo.getBounds(),d=b.w,h=b.h,j,k,l,m,n,p,b=c.x.tl.pixels(a,d);j=c.y.tl.pixels(a,
h);k=c.x.tr.pixels(a,d);l=c.y.tr.pixels(a,h);m=c.x.br.pixels(a,d);n=c.y.br.pixels(a,h);p=c.x.bl.pixels(a,d);c=c.y.bl.pixels(a,h);d=Math.min(d/(b+k),h/(l+n),d/(p+m),h/(j+c));d<1&&(b*=d,j*=d,k*=d,l*=d,m*=d,n*=d,p*=d,c*=d);return{x:{tl:b,tr:k,br:m,bl:p},y:{tl:j,tr:l,br:n,bl:c}}},getBoxPath:function(c,a,b){var a=a||1,d,h,j=this.boundsInfo.getBounds();h=j.w*a;var j=j.h*a,k=this.styleInfos.borderRadiusInfo,l=Math.floor,m=Math.ceil,n=c?c.t*a:0,p=c?c.r*a:0,o=c?c.b*a:0,c=c?c.l*a:0,q,r,s,w,u;b||k.isActive()?
(d=this.getRadiiPixels(b||k.getProps()),b=d.x.tl*a,k=d.y.tl*a,q=d.x.tr*a,r=d.y.tr*a,s=d.x.br*a,w=d.y.br*a,u=d.x.bl*a,a*=d.y.bl,h="m"+l(c)+","+l(k)+"qy"+l(b)+","+l(n)+"l"+m(h-q)+","+l(n)+"qx"+m(h-p)+","+l(r)+"l"+m(h-p)+","+m(j-w)+"qy"+m(h-s)+","+m(j-o)+"l"+l(u)+","+m(j-o)+"qx"+l(c)+","+m(j-a)+" x e"):h="m"+l(c)+","+l(n)+"l"+m(h-p)+","+l(n)+"l"+m(h-p)+","+m(j-o)+"l"+l(c)+","+m(j-o)+"xe";return h},getBox:function(){var c=this.parent.getLayer(this.boxZIndex),b;if(!c)c=a.createElement(this.boxName),b=
c.style,b.position="absolute",b.top=b.left=0,this.parent.addLayer(this.boxZIndex,c);return c},hideBorder:function(){var c=this.targetElement,d=c.currentStyle,g=c.runtimeStyle,i=c.tagName,h=b.ieVersion===6,j;if(h&&(i in b.childlessElements||i==="FIELDSET")||i==="BUTTON"||i==="INPUT"&&c.type in b.inputButtonTypes){g.borderWidth="";i=this.styleInfos.borderInfo.sides;for(j=i.length;j--;)h=i[j],g["padding"+h]="",g["padding"+h]=b.getLength(d["padding"+h]).pixels(c)+b.getLength(d["border"+h+"Width"]).pixels(c)+
(b.ieVersion!==8&&j%2?1:0);g.borderWidth=0}else if(h){if(c.childNodes.length!==1||c.firstChild.tagName!=="ie6-mask"){d=a.createElement("ie6-mask");i=d.style;i.visibility="visible";for(i.zoom=1;i=c.firstChild;)d.appendChild(i);c.appendChild(d);g.visibility="hidden"}}else g.borderColor="transparent"},unhideBorder:function(){},destroy:function(){this.parent.removeLayer(this.boxZIndex);delete this._shapes;delete this._layers}};b.RootRenderer=b.RendererBase.newRenderer({isActive:function(){var c=this.childRenderers,
a;for(a in c)if(c.hasOwnProperty(a)&&c[a].isActive())return!0;return!1},needsUpdate:function(){return this.styleInfos.visibilityInfo.changed()},updatePos:function(){if(this.isActive()){var c=this.getPositioningElement(),d=c,g,c=c.currentStyle,i=c.position,h=this.getBox().style,j=0,k=0,k=this.boundsInfo.getBounds();if(i==="fixed"&&b.ieVersion>6)j=k.x,k=k.y,d=i;else{do d=d.offsetParent;while(d&&d.currentStyle.position==="static");d?(g=d.getBoundingClientRect(),d=d.currentStyle,j=k.x-g.left-(parseFloat(d.borderLeftWidth)||
0),k=k.y-g.top-(parseFloat(d.borderTopWidth)||0)):(d=a.documentElement,j=k.x+d.scrollLeft-d.clientLeft,k=k.y+d.scrollTop-d.clientTop);d="absolute"}h.position=d;h.left=j;h.top=k;h.zIndex=i==="static"?-1:c.zIndex;this.isPositioned=!0}},updateSize:b.emptyFn,updateVisibility:function(){var c=this.styleInfos.visibilityInfo.getProps();this.getBox().style.display=c.visible&&c.displayed?"":"none"},updateProps:function(){this.isActive()?this.updateVisibility():this.destroy()},getPositioningElement:function(){var c=
this.targetElement;return c.tagName in b.tableCellTags?c.offsetParent:c},getBox:function(){var c=this._box,b;if(!c)b=this.getPositioningElement(),c=this._box=a.createElement("css3-container"),c.style.direction="ltr",this.updateVisibility(),b.parentNode.insertBefore(c,b);return c},finishUpdate:b.emptyFn,destroy:function(){var c=this._box,a;c&&(a=c.parentNode)&&a.removeChild(c);delete this._box;delete this._layers}});b.BackgroundRenderer=b.RendererBase.newRenderer({boxZIndex:2,boxName:"background",
needsUpdate:function(){var c=this.styleInfos;return c.backgroundInfo.changed()||c.borderRadiusInfo.changed()},isActive:function(){var c=this.styleInfos;return c.borderImageInfo.isActive()||c.borderRadiusInfo.isActive()||c.backgroundInfo.isActive()||c.boxShadowInfo.isActive()&&c.boxShadowInfo.getProps().inset},draw:function(){var c=this.boundsInfo.getBounds();c.w&&c.h&&(this.drawBgColor(),this.drawBgImages())},drawBgColor:function(){var c=this.styleInfos.backgroundInfo.getProps(),a=this.boundsInfo.getBounds(),
b=this.targetElement,d=c&&c.color,h,j;if(d&&d.alpha()>0){if(this.hideBackground(),c=this.getShape("bgColor","fill",this.getBox(),1),h=a.w,a=a.h,c.stroked=!1,c.coordsize=h*2+","+a*2,c.coordorigin="1,1",c.path=this.getBoxPath(null,2),j=c.style,j.width=h,j.height=a,c.fill.color=d.colorValue(b),b=d.alpha(),b<1)c.fill.opacity=b}else this.deleteShape("bgColor")},drawBgImages:function(){var c=this.styleInfos.backgroundInfo.getProps(),a=this.boundsInfo.getBounds(),c=c&&c.bgImages,b,d,h,j,k;if(c){this.hideBackground();
d=a.w;h=a.h;for(k=c.length;k--;)a=c[k],b=this.getShape("bgImage"+k,"fill",this.getBox(),2),b.stroked=!1,b.fill.type="tile",b.fillcolor="none",b.coordsize=d*2+","+h*2,b.coordorigin="1,1",b.path=this.getBoxPath(0,2),j=b.style,j.width=d,j.height=h,a.imgType==="linear-gradient"?this.addLinearGradient(b,a):(b.fill.src=a.imgUrl,this.positionBgImage(b,k))}for(k=c?c.length:0;this.deleteShape("bgImage"+k++););},positionBgImage:function(c,a){var d=this;b.Util.withImageSize(c.fill.src,function(i){var h=d.targetElement,
j=d.boundsInfo.getBounds(),k=j.w,j=j.h;if(k&&j){var l=c.fill,m=d.styleInfos,n=m.borderInfo.getProps(),p=n&&n.widths,n=p?p.t.pixels(h):0,o=p?p.r.pixels(h):0,q=p?p.b.pixels(h):0,p=p?p.l.pixels(h):0,m=m.backgroundInfo.getProps().bgImages[a],h=m.bgPosition?m.bgPosition.coords(h,k-i.w-p-o,j-i.h-n-q):{x:0,y:0},m=m.imgRepeat,q=o=0,r=k+1,s=j+1,w=b.ieVersion===8?0:1,p=Math.round(h.x)+p+0.5,n=Math.round(h.y)+n+0.5;l.position=p/k+","+n/j;if(m&&m!=="repeat"){if(m==="repeat-x"||m==="no-repeat")o=n+1,s=n+i.h+w;
if(m==="repeat-y"||m==="no-repeat")q=p+1,r=p+i.w+w;c.style.clip="rect("+o+"px,"+r+"px,"+s+"px,"+q+"px)"}}})},addLinearGradient:function(c,a){var d=this.targetElement,i=this.boundsInfo.getBounds(),h=i.w,j=i.h,i=c.fill,k=a.stops,l=k.length,m=Math.PI,n=b.GradientUtil,p=n.perpendicularIntersect,o=n.distance,n=n.getGradientMetrics(d,h,j,a),q=n.angle,r=n.startX,s=n.startY,w=n.startCornerX,u=n.startCornerY,v=n.endCornerX,C=n.endCornerY,t=n.deltaX,y=n.deltaY,n=n.lineLength,h=q%90?Math.atan2(t*h/j,y)/m*180:
q+90;h+=180;h%=360;v=p(w,u,q,v,C);j=o(w,u,v[0],v[1]);m=[];v=p(r,s,q,w,u);o=o(r,s,v[0],v[1])/j*100;p=[];for(q=0;q<l;q++)p.push(k[q].offset?k[q].offset.pixels(d,n):q===0?0:q===l-1?n:null);for(q=1;q<l;q++){if(p[q]===null){r=p[q-1];n=q;do s=p[++n];while(s===null);p[q]=r+(s-r)/(n-q+1)}p[q]=Math.max(p[q],p[q-1])}for(q=0;q<l;q++)m.push(o+p[q]/j*100+"% "+k[q].color.colorValue(d));i.angle=h;i.type="gradient";i.method="sigma";i.color=k[0].color.colorValue(d);i.color2=k[l-1].color.colorValue(d);i.colors?i.colors.value=
m.join(","):i.colors=m.join(",")},hideBackground:function(){var c=this.targetElement.runtimeStyle;if(!this.isMuseBGPolyfill())c.backgroundImage="url(about:blank)";c.backgroundColor="transparent"},destroy:function(){b.RendererBase.destroy.call(this);var c=this.targetElement.runtimeStyle;if(!this.isMuseBGPolyfill())c.backgroundImage="";c.backgroundColor=""},isMuseBGPolyfill:function(){return $(this.targetElement.children[0]).hasClass("museBgSizePolyfill")}});b.BorderRenderer=b.RendererBase.newRenderer({boxZIndex:4,
boxName:"border",needsUpdate:function(){var c=this.styleInfos;return c.borderInfo.changed()||c.borderRadiusInfo.changed()},isActive:function(){var c=this.styleInfos;return(c.borderRadiusInfo.isActive()||c.backgroundInfo.isActive())&&!c.borderImageInfo.isActive()&&c.borderInfo.isActive()},draw:function(){var c=this.targetElement,a=this.styleInfos.borderInfo.getProps(),b=this.boundsInfo.getBounds(),d=b.w,b=b.h,h,j,k,l,m;if(a){this.hideBorder();a=this.getBorderSegments(2);l=0;for(m=a.length;l<m;l++)k=
a[l],h=this.getShape("borderPiece"+l,k.stroke?"stroke":"fill",this.getBox()),h.coordsize=d*2+","+b*2,h.coordorigin="1,1",h.path=k.path,j=h.style,j.width=d,j.height=b,h.filled=!!k.fill,h.stroked=!!k.stroke,k.stroke?(h=h.stroke,h.weight=k.weight+"px",h.color=k.color.colorValue(c),h.dashstyle=k.stroke==="dashed"?"2 2":k.stroke==="dotted"?"1 1":"solid",h.linestyle=k.stroke==="double"&&k.weight>2?"ThinThin":"Single"):h.fill.color=k.fill.colorValue(c);for(;this.deleteShape("borderPiece"+l++););}},getBorderSegments:function(c){var a=
this.targetElement,b,d,h,j=this.styleInfos.borderInfo,k=[],l,m,n,p,o=Math.round,q,r,s;if(j.isActive())if(b=j.getProps(),j=b.widths,r=b.styles,s=b.colors,b.widthsSame&&b.stylesSame&&b.colorsSame)s.t.alpha()>0&&(b=j.t.pixels(a),n=b/2,k.push({path:this.getBoxPath({t:n,r:n,b:n,l:n},c),stroke:r.t,color:s.t,weight:b}));else{c=c||1;b=this.boundsInfo.getBounds();d=b.w;h=b.h;b=o(j.t.pixels(a));n=o(j.r.pixels(a));p=o(j.b.pixels(a));var a=o(j.l.pixels(a)),w={t:b,r:n,b:p,l:a},a=this.styleInfos.borderRadiusInfo;
a.isActive()&&(q=this.getRadiiPixels(a.getProps()));l=Math.floor;m=Math.ceil;var u=function(c,a){return q?q[c][a]:0},v=function(a,b,f,g,j,k){var n=u("x",a),o=u("y",a),q=a.charAt(1)==="r",a=a.charAt(0)==="b";return n>0&&o>0?(k?"al":"ae")+(q?m(d-n):l(n))*c+","+(a?m(h-o):l(o))*c+","+(l(n)-b)*c+","+(l(o)-f)*c+","+g*65535+","+2949075*(j?1:-1):(k?"m":"l")+(q?d-b:b)*c+","+(a?h-f:f)*c},C=function(a,b,f,g){var j=a==="t"?l(u("x","tl"))*c+","+m(b)*c:a==="r"?m(d-b)*c+","+l(u("y","tr"))*c:a==="b"?m(d-u("x","br"))*
c+","+l(h-b)*c:l(b)*c+","+m(h-u("y","bl"))*c,a=a==="t"?m(d-u("x","tr"))*c+","+m(b)*c:a==="r"?m(d-b)*c+","+m(h-u("y","br"))*c:a==="b"?l(u("x","bl"))*c+","+l(h-b)*c:l(b)*c+","+l(u("y","tl"))*c;return f?(g?"m"+a:"")+"l"+j:(g?"m"+j:"")+"l"+a},a=function(c,a,b,d,f,g){var i=c==="l"||c==="r",h=w[c],j,n;h>0&&r[c]!=="none"&&s[c].alpha()>0&&(j=w[i?c:a],a=w[i?a:c],n=w[i?c:b],b=w[i?b:c],r[c]==="dashed"||r[c]==="dotted"?(k.push({path:v(d,j,a,g+45,0,1)+v(d,0,0,g,1,0),fill:s[c]}),k.push({path:C(c,h/2,0,1),stroke:r[c],
weight:h,color:s[c]}),k.push({path:v(f,n,b,g,0,1)+v(f,0,0,g-45,1,0),fill:s[c]})):k.push({path:v(d,j,a,g+45,0,1)+C(c,h,0,0)+v(f,n,b,g,0,0)+(r[c]==="double"&&h>2?v(f,n-l(n/3),b-l(b/3),g-45,1,0)+C(c,m(h/3*2),1,0)+v(d,j-l(j/3),a-l(a/3),g,1,0)+"x "+v(d,l(j/3),l(a/3),g+45,0,1)+C(c,l(h/3),1,0)+v(f,l(n/3),l(b/3),g,0,0):"")+v(f,0,0,g-45,1,0)+C(c,0,1,0)+v(d,0,0,g,1,0),fill:s[c]}))};a("t","l","r","tl","tr",90);a("r","t","b","tr","br",0);a("b","r","l","br","bl",-90);a("l","b","t","bl","tl",-180)}return k},destroy:function(){if(this.finalized||
!this.styleInfos.borderImageInfo.isActive())this.targetElement.runtimeStyle.borderColor="";b.RendererBase.destroy.call(this)}});b.BorderImageRenderer=b.RendererBase.newRenderer({boxZIndex:5,pieceNames:["t","tr","r","br","b","bl","l","tl","c"],needsUpdate:function(){return this.styleInfos.borderImageInfo.changed()},isActive:function(){return this.styleInfos.borderImageInfo.isActive()},draw:function(){this.getBox();var c=this.styleInfos.borderImageInfo.getProps(),a=this.styleInfos.borderInfo.getProps(),
d=this.boundsInfo.getBounds(),i=this.targetElement,h=this.pieces;b.Util.withImageSize(c.src,function(j){function k(c,a,b,d,f){var c=h[c].style,g=Math.max;c.width=g(a,0);c.height=g(b,0);c.left=d;c.top=f}function l(c,a,b){for(var d=0,f=c.length;d<f;d++)h[c[d]].imagedata[a]=b}var m=d.w,n=d.h,p=b.getLength("0"),o=c.widths||(a?a.widths:{t:p,r:p,b:p,l:p}),p=o.t.pixels(i),q=o.r.pixels(i),r=o.b.pixels(i),o=o.l.pixels(i),s=c.slice,w=s.t.pixels(i),u=s.r.pixels(i),v=s.b.pixels(i),s=s.l.pixels(i);k("tl",o,p,
0,0);k("t",m-o-q,p,o,0);k("tr",q,p,m-q,0);k("r",q,n-p-r,m-q,p);k("br",q,r,m-q,n-r);k("b",m-o-q,r,o,n-r);k("bl",o,r,0,n-r);k("l",o,n-p-r,0,p);k("c",m-o-q,n-p-r,o,p);l(["tl","t","tr"],"cropBottom",(j.h-w)/j.h);l(["tl","l","bl"],"cropRight",(j.w-s)/j.w);l(["bl","b","br"],"cropTop",(j.h-v)/j.h);l(["tr","r","br"],"cropLeft",(j.w-u)/j.w);l(["l","r","c"],"cropTop",w/j.h);l(["l","r","c"],"cropBottom",v/j.h);l(["t","b","c"],"cropLeft",s/j.w);l(["t","b","c"],"cropRight",u/j.w);h.c.style.display=c.fill?"":"none"},
this)},getBox:function(){var c=this.parent.getLayer(this.boxZIndex),d,g,i,h=this.pieceNames,j=h.length;if(!c){c=a.createElement("border-image");d=c.style;d.position="absolute";this.pieces={};for(i=0;i<j;i++)g=this.pieces[h[i]]=b.Util.createVmlElement("rect"),g.appendChild(b.Util.createVmlElement("imagedata")),d=g.style,d.behavior="url(#default#VML)",d.position="absolute",d.top=d.left=0,g.imagedata.src=this.styleInfos.borderImageInfo.getProps().src,g.stroked=!1,g.filled=!1,c.appendChild(g);this.parent.addLayer(this.boxZIndex,
c)}return c},prepareUpdate:function(){if(this.isActive()){var c=this.targetElement,a=c.runtimeStyle,b=this.styleInfos.borderImageInfo.getProps().widths;a.borderStyle="solid";if(b)a.borderTopWidth=b.t.pixels(c)+"px",a.borderRightWidth=b.r.pixels(c)+"px",a.borderBottomWidth=b.b.pixels(c)+"px",a.borderLeftWidth=b.l.pixels(c)+"px";this.hideBorder()}},destroy:function(){var c=this.targetElement.runtimeStyle;c.borderStyle="";if(this.finalized||!this.styleInfos.borderInfo.isActive())c.borderColor=c.borderWidth=
"";b.RendererBase.destroy.call(this)}});b.BoxShadowOutsetRenderer=b.RendererBase.newRenderer({boxZIndex:1,boxName:"outset-box-shadow",needsUpdate:function(){var c=this.styleInfos;return c.boxShadowInfo.changed()||c.borderRadiusInfo.changed()},isActive:function(){var c=this.styleInfos.boxShadowInfo;return c.isActive()&&c.getProps().outset[0]},draw:function(){function c(c,b,h,j,l,m,n){c=a.getShape("shadow"+c+b,"fill",i,k-c);b=c.fill;c.coordsize=p*2+","+o*2;c.coordorigin="1,1";c.stroked=!1;c.filled=
!0;b.color=l.colorValue(d);if(m)b.type="gradienttitle",b.color2=b.color,b.opacity=0;c.path=n;u=c.style;u.left=h;u.top=j;u.width=p;u.height=o;return c}for(var a=this,d=this.targetElement,i=this.getBox(),h=this.styleInfos,j=h.boxShadowInfo.getProps().outset,h=h.borderRadiusInfo.getProps(),k=j.length,l=k,m,n=this.boundsInfo.getBounds(),p=n.w,o=n.h,n=b.ieVersion===8?1:0,q=["tl","tr","br","bl"],r,s,w,u,v,C,t,y,H,I,F,E,J,K;l--;){s=j[l];v=s.xOffset.pixels(d);C=s.yOffset.pixels(d);m=s.spread.pixels(d);t=
s.blur.pixels(d);s=s.color;y=-m-t;if(!h&&t)h=b.BorderRadiusStyleInfo.ALL_ZERO;y=this.getBoxPath({t:y,r:y,b:y,l:y},2,h);if(t)if(H=(m+t)*2+p,I=(m+t)*2+o,F=t*2/H,E=t*2/I,t-m>p/2||t-m>o/2)for(m=4;m--;)r=q[m],J=r.charAt(0)==="b",K=r.charAt(1)==="r",r=c(l,r,v,C,s,t,y),w=r.fill,w.focusposition=(K?1-F:F)+","+(J?1-E:E),w.focussize="0,0",r.style.clip="rect("+((J?I/2:0)+n)+"px,"+(K?H:H/2)+"px,"+(J?I:I/2)+"px,"+((K?H/2:0)+n)+"px)";else r=c(l,"",v,C,s,t,y),w=r.fill,w.focusposition=F+","+E,w.focussize=1-F*2+","+
(1-E*2);else if(r=c(l,"",v,C,s,t,y),v=s.alpha(),v<1)r.fill.opacity=v}}});b.ImgRenderer=b.RendererBase.newRenderer({boxZIndex:6,boxName:"imgEl",needsUpdate:function(){var c=this.styleInfos;return this.targetElement.src!==this._lastSrc||c.borderRadiusInfo.changed()},isActive:function(){var c=this.styleInfos;return c.borderRadiusInfo.isActive()||c.backgroundInfo.isPngFix()},draw:function(){this._lastSrc=k;this.hideActualImg();var c=this.getShape("img","fill",this.getBox()),a=c.fill,d=this.boundsInfo.getBounds(),
i=d.w,d=d.h,h=this.styleInfos.borderInfo.getProps(),j=h&&h.widths,h=this.targetElement,k=h.src,l=Math.round,m=h.currentStyle,n=b.getLength;if(!j||b.ieVersion<7)j=b.getLength("0"),j={t:j,r:j,b:j,l:j};c.stroked=!1;a.type="frame";a.src=k;a.position=(i?0.5/i:0)+","+(d?0.5/d:0);c.coordsize=i*2+","+d*2;c.coordorigin="1,1";c.path=this.getBoxPath({t:l(j.t.pixels(h)+n(m.paddingTop).pixels(h)),r:l(j.r.pixels(h)+n(m.paddingRight).pixels(h)),b:l(j.b.pixels(h)+n(m.paddingBottom).pixels(h)),l:l(j.l.pixels(h)+n(m.paddingLeft).pixels(h))},
2);c=c.style;c.width=i;c.height=d},hideActualImg:function(){this.targetElement.runtimeStyle.filter="alpha(opacity=0)"},destroy:function(){b.RendererBase.destroy.call(this);this.targetElement.runtimeStyle.filter=""}});b.IE9RootRenderer=b.RendererBase.newRenderer({updatePos:b.emptyFn,updateSize:b.emptyFn,updateVisibility:b.emptyFn,updateProps:b.emptyFn,outerCommasRE:/^,+|,+$/g,innerCommasRE:/,+/g,setBackgroundLayer:function(c,a){(this._bgLayers||(this._bgLayers=[]))[c]=a||void 0},finishUpdate:function(){var c=
this._bgLayers,a;if(c&&(a=c.join(",").replace(this.outerCommasRE,"").replace(this.innerCommasRE,","))!==this._lastBg)this._lastBg=this.targetElement.runtimeStyle.background=a},destroy:function(){this.targetElement.runtimeStyle.background="";delete this._bgLayers}});b.IE9BackgroundRenderer=b.RendererBase.newRenderer({bgLayerZIndex:1,needsUpdate:function(){return this.styleInfos.backgroundInfo.changed()},isActive:function(){var c=this.styleInfos;return c.backgroundInfo.isActive()||c.borderImageInfo.isActive()},
draw:function(){var c=this.styleInfos.backgroundInfo.getProps(),a,d,i=0,h,j;if(c){a=[];if(d=c.bgImages)for(;h=d[i++];)h.imgType==="linear-gradient"?(j=this.getBgAreaSize(h.bgOrigin),j=(h.bgSize||b.BgSize.DEFAULT).pixels(this.targetElement,j.w,j.h,j.w,j.h),a.push("url(data:image/svg+xml,"+escape(this.getGradientSvg(h,j.w,j.h))+") "+this.bgPositionToString(h.bgPosition)+" / "+j.w+"px "+j.h+"px "+(h.bgAttachment||"")+" "+(h.bgOrigin||"")+" "+(h.bgClip||""))):a.push(h.origString);c.color&&a.push(c.color.val);
this.parent.setBackgroundLayer(this.bgLayerZIndex,a.join(","))}},bgPositionToString:function(c){return c?c.tokens.map(function(c){return c.tokenValue}).join(" "):"0 0"},getBgAreaSize:function(c){var a=this.targetElement,d=this.boundsInfo.getBounds(),i=d.w,d=d.h,h;if(c!=="border-box"&&(h=this.styleInfos.borderInfo.getProps())&&(h=h.widths))i-=h.l.pixels(a)+h.l.pixels(a),d-=h.t.pixels(a)+h.b.pixels(a);if(c==="content-box")c=b.getLength,h=a.currentStyle,i-=c(h.paddingLeft).pixels(a)+c(h.paddingRight).pixels(a),
d-=c(h.paddingTop).pixels(a)+c(h.paddingBottom).pixels(a);return{w:i,h:d}},getGradientSvg:function(c,a,d){var i=this.targetElement,h=c.stops,j=h.length,k=b.GradientUtil.getGradientMetrics(i,a,d,c),c=k.startX,l=k.startY,m=k.endX,n=k.endY,k=k.lineLength,p,o,q,r,s;p=[];for(o=0;o<j;o++)p.push(h[o].offset?h[o].offset.pixels(i,k):o===0?0:o===j-1?k:null);for(o=1;o<j;o++)if(p[o]===null){r=p[o-1];q=o;do s=p[++q];while(s===null);p[o]=r+(s-r)/(q-o+1)}a=['<svg width="'+a+'" height="'+d+'" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="'+
c/a*100+'%" y1="'+l/d*100+'%" x2="'+m/a*100+'%" y2="'+n/d*100+'%">'];for(o=0;o<j;o++)a.push('<stop offset="'+p[o]/k+'" stop-color="'+h[o].color.colorValue(i)+'" stop-opacity="'+h[o].color.alpha()+'"/>');a.push('</linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>');return a.join("")},destroy:function(){this.parent.setBackgroundLayer(this.bgLayerZIndex)}});b.IE9BorderImageRenderer=b.RendererBase.newRenderer({REPEAT:"repeat",STRETCH:"stretch",ROUND:"round",bgLayerZIndex:0,
needsUpdate:function(){return this.styleInfos.borderImageInfo.changed()},isActive:function(){return this.styleInfos.borderImageInfo.isActive()},draw:function(){var c=this,a=c.styleInfos.borderImageInfo.getProps(),d=c.styleInfos.borderInfo.getProps(),i=c.boundsInfo.getBounds(),h=a.repeat,j=h.h,k=h.v,l=c.targetElement,m=0;b.Util.withImageSize(a.src,function(h){function p(c,a,b,d,f,g,i,h,l,m){N.push('<pattern patternUnits="userSpaceOnUse" id="pattern'+L+'" x="'+(j===u?c+b/2-l/2:c)+'" y="'+(k===u?a+d/
2-m/2:a)+'" width="'+l+'" height="'+m+'"><svg width="'+l+'" height="'+m+'" viewBox="'+f+" "+g+" "+i+" "+h+'" preserveAspectRatio="none"><image xlink:href="'+w+'" x="0" y="0" width="'+r+'" height="'+s+'" /></svg></pattern>');O.push('<rect x="'+c+'" y="'+a+'" width="'+b+'" height="'+d+'" fill="url(#pattern'+L+')" />');L++}var o=i.w,q=i.h,r=h.w,s=h.h,w=c.imageToDataURI(a.src,r,s),u=c.REPEAT,v=c.STRETCH,h=c.ROUND,C=Math.ceil,t=b.getLength("0"),y=a.widths||(d?d.widths:{t:t,r:t,b:t,l:t}),t=y.t.pixels(l),
H=y.r.pixels(l),I=y.b.pixels(l),y=y.l.pixels(l),F=a.slice,E=F.t.pixels(l),J=F.r.pixels(l),K=F.b.pixels(l),F=F.l.pixels(l),G=o-y-H,M=q-t-I,B=r-F-J,x=s-E-K,A=j===v?G:B*t/E,z=k===v?M:x*H/J,D=j===v?G:B*I/K,v=k===v?M:x*y/F,N=[],O=[],L=0;j===h&&(A-=(A-(G%A||A))/C(G/A),D-=(D-(G%D||D))/C(G/D));k===h&&(z-=(z-(M%z||z))/C(M/z),v-=(v-(M%v||v))/C(M/v));h=['<svg width="'+o+'" height="'+q+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'];p(0,0,y,t,0,0,F,E,y,t);p(y,0,G,t,F,0,B,E,
A,t);p(o-H,0,H,t,r-J,0,J,E,H,t);p(0,t,y,M,0,E,F,x,y,v);a.fill&&p(y,t,G,M,F,E,B,x,A||D||B,v||z||x);p(o-H,t,H,M,r-J,E,J,x,H,z);p(0,q-I,y,I,0,s-K,F,K,y,I);p(y,q-I,G,I,F,s-K,B,K,D,I);p(o-H,q-I,H,I,r-J,s-K,J,K,H,I);h.push("<defs>"+N.join("\n")+"</defs>"+O.join("\n")+"</svg>");c.parent.setBackgroundLayer(c.bgLayerZIndex,"url(data:image/svg+xml,"+escape(h.join(""))+") no-repeat border-box border-box");m&&c.parent.finishUpdate()},c);m=1},imageToDataURI:function(){var c={};return function(b,d,i){var h=c[b],
j;if(!h)h=new Image,j=a.createElement("canvas"),h.src=b,j.width=d,j.height=i,j.getContext("2d").drawImage(h,0,0),h=c[b]=j.toDataURL();return h}}(),prepareUpdate:b.BorderImageRenderer.prototype.prepareUpdate,destroy:function(){var c=this.targetElement.runtimeStyle;this.parent.setBackgroundLayer(this.bgLayerZIndex);c.borderColor=c.borderStyle=c.borderWidth=""}});b.Element=function(){function c(c){var a=q.slice.call(arguments,1),b=a.length;setTimeout(function(){for(;b--;)c.className+=" "+a[b]},0)}function d(c){var a=
q.slice.call(arguments,1),b=a.length;setTimeout(function(){for(;b--;){var d=c,f=a[b],f=o[f]||(o[f]=RegExp("\\b"+f+"\\b","g"));d.className=d.className.replace(f,"")}},0)}function g(g){function i(){if(!O){var c,d,f=b.ieDocMode,k=g.currentStyle,l=k.getAttribute(h)==="true";S=k.getAttribute(j);S=f>7?S!=="false":S==="true";if(!N){N=1;g.runtimeStyle.zoom=1;for(var k=g,m=1;k=k.previousSibling;)if(k.nodeType===1){m=0;break}m&&(g.className+=" "+n)}A.lock();if(l&&(d=A.getBounds())&&(c=a.documentElement||a.body)&&
(d.y>c.clientHeight||d.x>c.clientWidth||d.y+d.h<0||d.x+d.w<0))R||(R=1,b.OnScroll.observe(i));else{O=1;R=N=0;b.OnScroll.unobserve(i);f===9?(z={backgroundInfo:new b.BackgroundStyleInfo(g),borderImageInfo:new b.BorderImageStyleInfo(g),borderInfo:new b.BorderStyleInfo(g)},D=[z.backgroundInfo,z.borderImageInfo],x=new b.IE9RootRenderer(g,A,z),c=[new b.IE9BackgroundRenderer(g,A,z,x),new b.IE9BorderImageRenderer(g,A,z,x)]):(z={backgroundInfo:new b.BackgroundStyleInfo(g),borderInfo:new b.BorderStyleInfo(g),
borderImageInfo:new b.BorderImageStyleInfo(g),borderRadiusInfo:new b.BorderRadiusStyleInfo(g),boxShadowInfo:new b.BoxShadowStyleInfo(g),visibilityInfo:new b.VisibilityStyleInfo(g)},D=[z.backgroundInfo,z.borderInfo,z.borderImageInfo,z.borderRadiusInfo,z.boxShadowInfo,z.visibilityInfo],x=new b.RootRenderer(g,A,z),c=[new b.BoxShadowOutsetRenderer(g,A,z,x),new b.BackgroundRenderer(g,A,z,x),new b.BorderRenderer(g,A,z,x),new b.BorderImageRenderer(g,A,z,x)],g.tagName==="IMG"&&c.push(new b.ImgRenderer(g,
A,z,x)),x.childRenderers=c);B=[x].concat(c);if(c=g.currentStyle.getAttribute(b.CSS_PREFIX+"watch-ancestors")){c=parseInt(c,10);d=0;for(l=g.parentNode;l&&(c==="NaN"||d++<c);)G(l,"onpropertychange",E),G(l,"onmouseenter",C),G(l,"onmouseleave",t),G(l,"onmousedown",y),l.tagName in b.focusableElements&&(G(l,"onfocus",I),G(l,"onblur",F)),l=l.parentNode}S&&(b.Heartbeat.observe(q),b.Heartbeat.run());q(1)}L||(L=1,f<9&&G(g,"onmove",o),G(g,"onresize",o),G(g,"onpropertychange",v),G(g,"onmouseenter",C),G(g,"onmouseleave",
t),G(g,"onmousedown",y),g.tagName in b.focusableElements&&(G(g,"onfocus",I),G(g,"onblur",F)),b.OnResize.observe(o),b.OnUnload.observe(M));A.unlock()}}function o(){A&&A.hasBeenQueried()&&q()}function q(c){if(!Q)if(O){var a,b=B.length;J();for(a=0;a<b;a++)B[a].prepareUpdate();if(c||A.positionChanged())for(a=0;a<b;a++)B[a].updatePos();if(c||A.sizeChanged())for(a=0;a<b;a++)B[a].updateSize();x.finishUpdate();K()}else N||i()}function v(){var c,a=B.length,b;c=event;if(!Q&&!(c&&c.propertyName in p))if(O){J();
for(c=0;c<a;c++)B[c].prepareUpdate();for(c=0;c<a;c++)b=B[c],b.isPositioned||b.updatePos(),b.needsUpdate()&&b.updateProps();x.finishUpdate();K()}else N||i()}function C(){c(g,k)}function t(){d(g,k,l)}function y(){c(g,l);b.OnMouseup.observe(H)}function H(){d(g,l);b.OnMouseup.unobserve(H)}function I(){c(g,m)}function F(){d(g,m)}function E(){var c=event.propertyName;(c==="className"||c==="id")&&v()}function J(){A.lock();for(var c=D.length;c--;)D[c].lock()}function K(){for(var c=D.length;c--;)D[c].unlock();
A.unlock()}function G(c,a,b){c.attachEvent(a,b);P.push([c,a,b])}function M(){if(L){for(var c=P.length,a;c--;)a=P[c],a[0].detachEvent(a[1],a[2]);b.OnUnload.unobserve(M);L=0;P=[]}}var B,x,A=new b.BoundsInfo(g),z,D,N,O,L,P=[],R,Q,S;this.init=i;this.update=q;this.destroy=function(){if(!Q){var c,a;M();Q=1;if(B){c=0;for(a=B.length;c<a;c++)B[c].finalized=1,B[c].destroy()}S&&b.Heartbeat.unobserve(q);b.OnResize.unobserve(q);B=A=z=D=g=null}};this.el=g}var i={},h=b.CSS_PREFIX+"lazy-init",j=b.CSS_PREFIX+"poll",
k=b.CLASS_PREFIX+"hover",l=b.CLASS_PREFIX+"active",m=b.CLASS_PREFIX+"focus",n=b.CLASS_PREFIX+"first-child",p={background:1,bgColor:1,display:1},o={},q=[];g.getInstance=function(c){var a=b.Util.getUID(c);return i[a]||(i[a]=new g(c))};g.destroy=function(c){var c=b.Util.getUID(c),a=i[c];a&&(a.destroy(),delete i[c])};g.destroyAll=function(){var c=[],a;if(i){for(var b in i)i.hasOwnProperty(b)&&(a=i[b],c.push(a.el),a.destroy());i={}}return c};return g}();b.supportsVML=b.supportsVML;b.attach=function(c){b.ieDocMode<
10&&b.supportsVML&&b.Element.getInstance(c).init()};b.detach=function(c){b.Element.destroy(c)}}})();
/*!
 * Spinners 3.0.0
 * (c) 2010-2012 Nick Stakenburg - http://www.nickstakenburg.com
 *
 * Spinners is freely distributable under the terms of an MIT-style license.
 *
 * GitHub: http://github.com/staaky/spinners
 */

;var Spinners={version:"3.0.0"};(function(a){function b(a){return a*Math.PI/180}function c(a){this.element=a}function d(b,c){b&&(this.element=b,h.remove(b),h.removeDetached(),this._position=0,this._state="stopped",this.setOptions(a.extend({color:"#000",dashes:12,radius:5,height:5,width:1.8,opacity:1,padding:3,rotation:700},c||{})),this.drawPosition(0),h.add(this))}var e={scroll:function(a,b){if(!b)return a;var c=a.slice(0,b);return a.slice(b,a.length).concat(c)},isElement:function(a){return a&&1==a.nodeType},element:{isAttached:function(){return function(a){for(;a&&a.parentNode;)a=a.parentNode;return!!a&&!!a.body}}()}},f={drawRoundedRectangle:function(c,d){var e=a.extend({top:0,left:0,width:0,height:0,radius:0},d||{}),f=e.left,g=e.top,h=e.width,i=e.height,e=e.radius;c.beginPath(),c.moveTo(f+e,g),c.arc(f+h-e,g+e,e,b(-90),b(0),!1),c.arc(f+h-e,g+i-e,e,b(0),b(90),!1),c.arc(f+e,g+i-e,e,b(90),b(180),!1),c.arc(f+e,g+e,e,b(-180),b(-90),!1),c.closePath(),c.fill()}},g=function(){function a(a){var c=[];0==a.indexOf("#")&&(a=a.substring(1)),a=a.toLowerCase();if(""!=a.replace(b,""))return null;3==a.length?(c[0]=a.charAt(0)+a.charAt(0),c[1]=a.charAt(1)+a.charAt(1),c[2]=a.charAt(2)+a.charAt(2)):(c[0]=a.substring(0,2),c[1]=a.substring(2,4),c[2]=a.substring(4));for(a=0;a<c.length;a++)c[a]=parseInt(c[a],16);return c.red=c[0],c.green=c[1],c.blue=c[2],c}var b=RegExp("[0123456789abcdef]","g"),c=function(){function a(a,b,c){return a=a.toString(c||10),Array(b-a.length).join("0")+a}return function(b,c,d){return"#"+a(b,2,16)+a(c,2,16)+a(d,2,16)}}();return{hex2rgb:a,hex2fill:function(b,c){"undefined"==typeof c&&(c=1);var d=c,e=a(b);return e[3]=d,e.opacity=d,"rgba("+e.join()+")"},rgb2hex:c}}();a.extend(Spinners,{enabled:!1,support:{canvas:function(){var b=a("<canvas>")[0];return!!b.getContext&&!!b.getContext("2d")}()},init:function(){if(this.support.canvas||window.G_vmlCanvasManager&&window.attachEvent&&-1===navigator.userAgent.indexOf("Opera"))window.G_vmlCanvasManager&&window.G_vmlCanvasManager.init_(document),this.enabled=!0},create:function(a,b){return c.create(a,b),this.get(a)},get:function(a){return new c(a)},play:function(a){return this.get(a).play(),this},pause:function(a){return this.get(a).pause(),this},toggle:function(a){return this.get(a).toggle(),this},stop:function(a){return this.get(a).stop(),this},remove:function(a){return this.get(a).remove(),this},removeDetached:function(){return h.removeDetached(),this},center:function(a){return this.get(a).center(),this},setOptions:function(a,b){return this.get(a).setOptions(b),this},getDimensions:function(a){return a=2*h.get(a)[0].getLayout().workspace.radius,{width:a,height:a}}});var h={spinners:[],get:function(b){if(b){var c=[];return a.each(this.spinners,function(d,f){f&&(e.isElement(b)?f.element==b:a(f.element).is(b))&&c.push(f)}),c}},add:function(a){this.spinners.push(a)},remove:function(b){a(a.map(this.spinners,function(c){if(e.isElement(b)?c.element==b:a(c.element).is(b))return c.element})).each(a.proxy(function(a,b){this.removeByElement(b)},this))},removeByElement:function(b){var c=this.get(b)[0];c&&(c.remove(),this.spinners=a.grep(this.spinners,function(a){return a.element!=b}))},removeDetached:function(){a.each(this.spinners,a.proxy(function(a,b){b&&b.element&&!e.element.isAttached(b.element)&&this.remove(b.element)},this))}};a.extend(c,{create:function(b,c){if(b){var f=c||{},g=[];return e.isElement(b)?g.push(new d(b,f)):a(b).each(function(a,b){g.push(new d(b,f))}),g}}}),a.extend(c.prototype,{items:function(){return h.get(this.element)},play:function(){return a.each(this.items(),function(a,b){b.play()}),this},stop:function(){return a.each(this.items(),function(a,b){b.stop()}),this},pause:function(){return a.each(this.items(),function(a,b){b.pause()}),this},toggle:function(){return a.each(this.items(),function(a,b){b.toggle()}),this},center:function(){return a.each(this.items(),function(a,b){b.center()}),this},setOptions:function(b){return a.each(this.items(),function(a,c){c.setOptions(b)}),this},remove:function(){return h.remove(this.element),this}}),a.extend(d.prototype,{setOptions:function(b){this.options=a.extend({},this.options,b||{}),this.options.radii&&(b=this.options.radii,this.options.radius=Math.min(b[0],b[1]),this.options.height=Math.max(b[0],b[1])-this.options.radius),this.options.dashWidth&&(this.options.width=this.options.dashWidth),this.options.speed&&(this.options.duration=1e3*this.options.speed);var b=this._state,c=this._position;this._layout=null,this.build(),c&&c>=this.options.dashes-1&&(this._position=this.options.dashes-1);switch(b){case"playing":this.play();break;case"paused":case"stopped":this.drawPosition(this._position)}this._centered&&this.center()},remove:function(){this.canvas&&(this.pause(),a(this.canvas).remove(),this.ctx=this.canvas=null)},build:function(){this.remove();var b=this.getLayout().workspace.radius;return a(document.body).append(this.canvas=a("<canvas>").attr({width:2*b,height:2*b}).css({zoom:1})),window.G_vmlCanvasManager&&G_vmlCanvasManager.initElement(this.canvas[0]),this.ctx=this.canvas[0].getContext("2d"),this.ctx.globalAlpha=this.options.opacity,a(this.element).append(this.canvas),this.ctx.translate(b,b),this},drawPosition:function(a){var c=this.getLayout().workspace,a=e.scroll(c.opacities,-1*a),d=c.radius,c=this.options.dashes,f=b(360/c);this.ctx.clearRect(-1*d,-1*d,2*d,2*d);for(d=0;d<c;d++)this.drawDash(a[d],this.options.color),this.ctx.rotate(f)},drawDash:function(a,b){this.ctx.fillStyle=g.hex2fill(b,a);var c=this.getLayout(),d=c.workspace.radius,e=c.dash.position,c=c.dash.dimensions;f.drawRoundedRectangle(this.ctx,{top:e.top-d,left:e.left-d,width:c.width,height:c.height,radius:Math.min(c.height,c.width)/2})},_nextPosition:function(){var b=this.options.rotation/this.options.dashes;this.nextPosition(),this._playTimer=window.setTimeout(a.proxy(this._nextPosition,this),b)},nextPosition:function(){this._position==this.options.dashes-1&&(this._position=-1),this._position++,this.drawPosition(this._position)},play:function(){if("playing"!=this._state){this._state="playing";var b=this.options.rotation/this.options.dashes;return this._playTimer=window.setTimeout(a.proxy(this._nextPosition,this),b),this}},pause:function(){if("paused"!=this._state)return this._pause(),this._state="paused",this},_pause:function(){this._playTimer&&(window.clearTimeout(this._playTimer),this._playTimer=null)},stop:function(){if("stopped"!=this._state)return this._pause(),this._position=0,this.drawPosition(0),this._state="stopped",this},toggle:function(){return this["playing"==this._state?"pause":"play"](),this},getLayout:function(){if(this._layout)return this._layout;for(var a=this.options,b=a.dashes,c=a.width,d=a.radius,e=a.radius+a.height,f=Math.max(c,e),f=Math.ceil(Math.max(f,Math.sqrt(e*e+c/2*(c/2)))),a=f+=a.padding,g=1/b,h=[],i=0;i<b;i++)h.push((i+1)*g);return this._layout=b={workspace:{radius:a,opacities:h},dash:{position:{top:f-e,left:f-c/2},dimensions:{width:c,height:e-d}}}},center:function(){var b=2*this.getLayout().workspace.radius;a(this.element.parentNode).css({position:"relative"}),a(this.element).css({position:"absolute",height:b+"px",width:b+"px",top:"50%",left:"50%",marginLeft:-0.5*b+"px",marginTop:-0.5*b+"px"}),this._centered=!0}}),Spinners.init(),Spinners.enabled||(c.create=function(){return[]})})(jQuery);
(function(a){typeof define==="function"&&define.amd&&define.amd.jQuery?define(["jquery"],a):a(jQuery)})(function(a){function b(b){if(b&&b.allowPageScroll===void 0&&(b.swipe!==void 0||b.swipeStatus!==void 0))b.allowPageScroll=i;if(b.click!==void 0&&b.tap===void 0)b.tap=b.click;b||(b={});b=a.extend({},a.fn.swipe.defaults,b);return this.each(function(){var g=a(this),d=g.data(R);d||(d=new c(this,b),g.data(R,d))})}function c(b,c){function ha(b){if(t.data(R+"_intouch")!==!0&&!(a(b.target).closest(c.excludedElements,
t).length>0)){var g=b.originalEvent?b.originalEvent:b,d,k=r?g.touches[0]:g;A=F;r?B=g.touches.length:b.preventDefault();G=0;K=H=null;N=O=D=0;I=1;L=0;w=Ba();Y=Ca();Z=V=0;if(!r||B===c.fingers||c.fingers===x||W()){if(ia(0,k),aa=P(),B==2&&(ia(1,g.touches[1]),O=N=ja(w[0].start,w[1].start)),c.swipeStatus||c.pinchStatus)d=J(g,A)}else d=!1;if(d===!1)return A=z,J(g,A),d;else c.hold&&(ka=setTimeout(a.proxy(function(){t.trigger("hold",[g.target]);c.hold&&(d=c.hold.call(t,g,g.target))},this),c.longTapThreshold)),
ba(!0);return null}}function la(b){var o=b.originalEvent?b.originalEvent:b;if(!(A===C||A===z||ta())){var p,q=ua(r?o.touches[0]:o);X=P();if(r)B=o.touches.length;c.hold&&clearTimeout(ka);A=u;B==2&&(O==0?(ia(1,o.touches[1]),O=N=ja(w[0].start,w[1].start)):(ua(o.touches[1]),N=ja(w[0].end,w[1].end),K=I<1?j:h),I=(N/O*1).toFixed(2),L=Math.abs(O-N));if(B===c.fingers||c.fingers===x||!r||W()){var n;n=q.start;var m=q.end;n=Math.round(Math.atan2(m.y-n.y,n.x-m.x)*180/Math.PI);n<0&&(n=360-Math.abs(n));n=H=n<=45&&
n>=0?d:n<=360&&n>=315?d:n>=135&&n<=225?f:n>45&&n<135?k:g;if(c.allowPageScroll===i||W())b.preventDefault();else switch(m=c.allowPageScroll===l,n){case d:(c.swipeLeft&&m||!m&&c.allowPageScroll!=s)&&b.preventDefault();break;case f:(c.swipeRight&&m||!m&&c.allowPageScroll!=s)&&b.preventDefault();break;case g:(c.swipeUp&&m||!m&&c.allowPageScroll!=v)&&b.preventDefault();break;case k:(c.swipeDown&&m||!m&&c.allowPageScroll!=v)&&b.preventDefault()}G=Math.round(Math.sqrt(Math.pow(q.end.x-q.start.x,2)+Math.pow(q.end.y-
q.start.y,2)));D=X-aa;b=H;n=G;n=Math.max(n,va(b));Y[b].distance=n;if(c.swipeStatus||c.pinchStatus)p=J(o,A);if(!c.triggerOnTouchEnd||c.triggerOnTouchLeave)b=!0,c.triggerOnTouchLeave&&(b=a(this),n=b.offset(),b={left:n.left,right:n.left+b.outerWidth(),top:n.top,bottom:n.top+b.outerHeight()},b=q.end.x>b.left&&q.end.x<b.right&&q.end.y>b.top&&q.end.y<b.bottom),!c.triggerOnTouchEnd&&b?A=ma(u):c.triggerOnTouchLeave&&!b&&(A=ma(C)),(A==z||A==C)&&J(o,A)}else A=z,J(o,A);p===!1&&(A=z,J(o,A))}}function na(a){var b=
a.originalEvent;if(r&&b.touches.length>0)return V=P(),Z=event.touches.length+1,!0;ta()&&(B=Z);X=P();D=X-aa;oa()||!pa()?(A=z,J(b,A)):c.triggerOnTouchEnd||c.triggerOnTouchEnd==!1&&A===u?(a.preventDefault(),A=C,J(b,A)):!c.triggerOnTouchEnd&&c.tap?(A=C,S(b,A,q)):A===u&&(A=z,J(b,A));ba(!1);return null}function T(){N=O=aa=X=B=0;I=1;Z=V=0;ba(!1)}function qa(a){a=a.originalEvent;c.triggerOnTouchLeave&&(A=ma(C),J(a,A))}function wa(){t.unbind(ca,ha);t.unbind(da,T);t.unbind(ra,la);t.unbind(sa,na);U&&t.unbind(U,
qa);ba(!1)}function ma(a){var b=a,g=c.maxTimeThreshold?D>=c.maxTimeThreshold?!1:!0:!0,d=pa(),k=oa();!g||k?b=z:d&&a==u&&(!c.triggerOnTouchEnd||c.triggerOnTouchLeave)?b=C:!d&&a==C&&c.triggerOnTouchLeave&&(b=z);return b}function J(a,b){var g=void 0;if(xa()&&ya()||ya())g=S(a,b,m);else if((za()&&W()||W())&&g!==!1)g=S(a,b,o);Aa()&&c.doubleTap&&g!==!1?g=S(a,b,p):D>c.longTapThreshold&&G<y&&c.longTap&&g!==!1?g=S(a,b,n):(B===1||!r)&&(isNaN(G)||G<c.threshold)&&c.tap&&g!==!1&&(g=S(a,b,q));b===z&&T(a);b===C&&
(r?a.touches.length==0&&T(a):T(a));return g}function S(b,i,l){var s=void 0;if(l==m){t.trigger("swipeStatus",[i,H||null,G||0,D||0,B,w]);if(c.swipeStatus&&(s=c.swipeStatus.call(t,b,i,H||null,G||0,D||0,B,w),s===!1))return!1;if(i==C&&xa()){t.trigger("swipe",[H,G,D,B,w]);if(c.swipe&&(s=c.swipe.call(t,b,H,G,D,B,w),s===!1))return!1;switch(H){case d:t.trigger("swipeLeft",[H,G,D,B,w]);c.swipeLeft&&(s=c.swipeLeft.call(t,b,H,G,D,B,w));break;case f:t.trigger("swipeRight",[H,G,D,B,w]);c.swipeRight&&(s=c.swipeRight.call(t,
b,H,G,D,B,w));break;case g:t.trigger("swipeUp",[H,G,D,B,w]);c.swipeUp&&(s=c.swipeUp.call(t,b,H,G,D,B,w));break;case k:t.trigger("swipeDown",[H,G,D,B,w]),c.swipeDown&&(s=c.swipeDown.call(t,b,H,G,D,B,w))}}}if(l==o){t.trigger("pinchStatus",[i,K||null,L||0,D||0,B,I,w]);if(c.pinchStatus&&(s=c.pinchStatus.call(t,b,i,K||null,L||0,D||0,B,I,w),s===!1))return!1;if(i==C&&za())switch(K){case h:t.trigger("pinchIn",[K||null,L||0,D||0,B,I,w]);c.pinchIn&&(s=c.pinchIn.call(t,b,K||null,L||0,D||0,B,I,w));break;case j:t.trigger("pinchOut",
[K||null,L||0,D||0,B,I,w]),c.pinchOut&&(s=c.pinchOut.call(t,b,K||null,L||0,D||0,B,I,w))}}if(l==q){if(i===z||i===C)clearTimeout(ea),clearTimeout(ka),c.doubleTap&&!Aa()?(Q=P(),ea=setTimeout(a.proxy(function(){Q=null;t.trigger("tap",[b.target]);c.tap&&(s=c.tap.call(t,b,b.target))},this),c.doubleTapThreshold)):(Q=null,t.trigger("tap",[b.target]),c.tap&&(s=c.tap.call(t,b,b.target)))}else if(l==p){if(i===z||i===C)clearTimeout(ea),Q=null,t.trigger("doubletap",[b.target]),c.doubleTap&&(s=c.doubleTap.call(t,
b,b.target))}else if(l==n&&(i===z||i===C))clearTimeout(ea),Q=null,t.trigger("longtap",[b.target]),c.longTap&&(s=c.longTap.call(t,b,b.target));return s}function pa(){var a=!0;c.threshold!==null&&(a=G>=c.threshold);return a}function oa(){var a=!1;c.cancelThreshold!==null&&H!==null&&(a=va(H)-G>=c.cancelThreshold);return a}function za(){var a=B===c.fingers||c.fingers===x||!r,b=w[0].end.x!==0,g;g=c.pinchThreshold!==null?L>=c.pinchThreshold:!0;return a&&b&&g}function W(){return!(!c.pinchStatus&&!c.pinchIn&&
!c.pinchOut)}function xa(){var a=c.maxTimeThreshold?D>=c.maxTimeThreshold?!1:!0:!0,b=pa(),g=B===c.fingers||c.fingers===x||!r,d=w[0].end.x!==0;return!oa()&&d&&g&&b&&a}function ya(){return!(!c.swipe&&!c.swipeStatus&&!c.swipeLeft&&!c.swipeRight&&!c.swipeUp&&!c.swipeDown)}function Aa(){if(Q==null)return!1;var a=P();return!!c.doubleTap&&a-Q<=c.doubleTapThreshold}function ta(){var a=!1;V&&P()-V<=c.fingerReleaseThreshold&&(a=!0);return a}function ba(a){a===!0?(t.bind(ra,la),t.bind(sa,na),U&&t.bind(U,qa)):
(t.unbind(ra,la,!1),t.unbind(sa,na,!1),U&&t.unbind(U,qa,!1));t.data(R+"_intouch",a===!0)}function ia(a,b){w[a].identifier=b.identifier!==void 0?b.identifier:0;w[a].start.x=w[a].end.x=b.pageX||b.clientX;w[a].start.y=w[a].end.y=b.pageY||b.clientY;return w[a]}function ua(a){var b;a:{for(b=0;b<w.length;b++)if(w[b].identifier==(a.identifier!==void 0?a.identifier:0)){b=w[b];break a}b=void 0}b.end.x=a.pageX||a.clientX;b.end.y=a.pageY||a.clientY;return b}function Ba(){for(var a=[],b=0;b<=5;b++)a.push({start:{x:0,
y:0},end:{x:0,y:0},identifier:0});return a}function va(a){if(Y[a])return Y[a].distance}function Ca(){var a={};a[d]=fa(d);a[f]=fa(f);a[g]=fa(g);a[k]=fa(k);return a}function fa(a){return{direction:a,distance:0}}function ja(a,b){var c=Math.abs(a.x-b.x),g=Math.abs(a.y-b.y);return Math.round(Math.sqrt(c*c+g*g))}function P(){return(new Date).getTime()}var ga=r||M||!c.fallbackToMouseEvents,ca=ga?M?E?"MSPointerDown":"pointerdown":"touchstart":"mousedown",ra=ga?M?E?"MSPointerMove":"pointermove":"touchmove":
"mousemove",sa=ga?M?E?"MSPointerUp":"pointerup":"touchend":"mouseup",U=ga?null:"mouseleave",da=M?E?"MSPointerCancel":"pointercancel":"touchcancel",G=0,H=null,D=0,O=0,N=0,I=1,L=0,K=0,Y=null,t=a(b),A="start",B=0,w=null,aa=0,X=0,V=0,Z=0,Q=0,ea=null,ka=null;try{t.bind(ca,ha),t.bind(da,T)}catch(Da){a.error("events not supported "+ca+","+da+" on jQuery.swipe")}this.enable=function(){t.bind(ca,ha);t.bind(da,T);return t};this.disable=function(){wa();return t};this.destroy=function(){wa();t.data(R,null);return t};
this.option=function(b,g){if(c[b]!==void 0)if(g===void 0)return c[b];else c[b]=g;else a.error("Option "+b+" does not exist on jQuery.swipe.options");return null}}var d="left",f="right",g="up",k="down",h="in",j="out",i="none",l="auto",m="swipe",o="pinch",q="tap",p="doubletap",n="longtap",s="horizontal",v="vertical",x="all",y=10,F="start",u="move",C="end",z="cancel",r="ontouchstart"in window,E=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,M=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,
R="TouchSwipe";a.fn.swipe=function(c){var g=a(this),d=g.data(R);if(d&&typeof c==="string")if(d[c])return d[c].apply(this,Array.prototype.slice.call(arguments,1));else a.error("Method "+c+" does not exist on jQuery.swipe");else if(!d&&(typeof c==="object"||!c))return b.apply(this,arguments);return g};a.fn.swipe.defaults={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,
swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};a.fn.swipe.phases={PHASE_START:F,PHASE_MOVE:u,PHASE_END:C,PHASE_CANCEL:z};a.fn.swipe.directions={LEFT:d,RIGHT:f,UP:g,DOWN:k,IN:h,OUT:j};a.fn.swipe.pageScroll={NONE:i,HORIZONTAL:s,
VERTICAL:v,AUTO:l};a.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:x}});
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"touchswipe.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("touchswipe.js");break}}}}})();
/*

 Copyright (c) 2012. Adobe Systems Incorporated.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of Adobe Systems Incorporated nor the names of its
 contributors may be used to endorse or promote products derived from this
 software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
*/

(function(a,b){function c(){}var d={version:0.1,inherit:function(a,b){var c=function(){};c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.prototype._super=b},ensureArray:function(){var b=[],c=arguments.length;c>0&&(b=c>1||!a.isArray(arguments[0])?a.makeArray(arguments):arguments[0]);return b},scopedFind:function(b,c,d,h){for(var d=" "+d+" ",l=[],b=a(b).find(c),c=b.length,h=a(h)[0],j=0;j<c;j++)for(var i=b[j],n=i;n;){if(n.className&&(" "+n.className+" ").indexOf(d)!==-1){n===h&&
l.push(i);break}n=n.parentNode}return a(l)}};a.extend(c.prototype,{bind:function(b,c,d){return a(this).bind(b,c,d)},unbind:function(b,c){return a(this).unbind(b,c)},trigger:function(b,c){var d=a.Event(b);a(this).trigger(d,c);return d}});d.EventDispatcher=c;b.WebPro=d})(jQuery,window,document);
(function(a,b){var c=1;b.ImageLoader=function(c){b.EventDispatcher.call();var f=this;this.options=a.extend({},this.defaultOptions,c);this._currentEntry=null;this._queue=[];this._isRunning=this._needsSort=!1;this._loader=new Image;this._loadFunc=function(){f._handleLoad()};this._loadErrorFunc=function(){f._handleError()};this._timeoutFunc=function(){f.trigger("wp-image-loader-timeout",this._currentEntry);f._loadNext()}};b.inherit(b.ImageLoader,b.EventDispatcher);a.extend(b.ImageLoader.prototype,{defaultOptions:{timeoutInterval:1E3},
add:function(d,f){if(d){urls=b.ensureArray(d);for(var g=0;g<urls.length;g++){var k=a.extend({reqId:c++,src:urls[g],width:0,height:0,priority:50,callback:null,data:null},f);this._queue.push(k);this._needsSort=!0;this.trigger("wp-image-loader-add",k)}this._isRunning&&!this._currentEntry&&this._loadNext()}},reprioritize:function(a,b){if(!(this._currentEntry&&this._currentEntry.src==a)){var c;for(c=0;c<this._queue.length;++c)if(this._queue[c].src==a)break;if(c!=0&&c<this._queue.length)this._queue=this._queue.splice(c,
b?this._queue.length-c:1).concat(this._queue)}},start:function(){if(!this._isRunning)this._isRunning=!0,this._loadNext(),this.trigger("wp-image-loader-start")},stop:function(){if(this._isRunning)this._currentEntry&&this._queue.unshift(this._currentEntry),this._resetLoader(),this._isRunning=!1,this.trigger("wp-image-loader-stop")},clearQueue:function(){var a=this._isRunning;this.stop();this._queue.length=0;a&&this.start()},isQueueEmpty:function(){return this._queue.length==0},_loadNext:function(){var d;
this._resetLoader();var a=this._queue;if(a.length){if(this._needsSort)d=this._queue=a.sort(function(a,b){var c=a.priority-b.priority;return c?c:a.reqId-b.reqId}),a=d,this._needsSort=!1;this._currentEntry=a=a.shift();var b=this._loader;b.onload=this._loadFunc;b.onerror=this._loadErrorFunc;b.src=a.src}},_resetLoader:function(){var a=this._loader;a.onload=null;a.onerror=null;this._currentEntry=a.src=null;if(this._timeoutTimerId)clearTimeout(this._timeoutTimerId),this._timeoutTimerId=0},_handleLoad:function(){var a=
this._loader,b=this._currentEntry;b.width=a.width;b.height=a.height;b.callback&&b.callback(b.src,b.width,b.height,b.data);this.trigger("wp-image-loader-load-success",b);this._loadNext()},_handleError:function(){this.trigger("wp-image-loader-load-error",this._currentEntry);this._loadNext()}})})(jQuery,WebPro,window,document);
(function(a,b){function c(){b.EventDispatcher.call(this);this._initialize.apply(this,arguments)}b.inherit(c,b.EventDispatcher);a.extend(c.prototype,{defaultOptions:{},_widgetName:"Widget",_initialize:function(){var b;this.plugins=[];var c=this.trigger("before-setup");c.isDefaultPrevented()||(b=this._setUp.apply(this,arguments),this.trigger("setup"));c=this.trigger("before-init-plugins");c.isDefaultPrevented()||(this._initializePlugins(b),this.trigger("init-plugins"));this.options=a.extend({},this.defaultOptions,
b);c=this.trigger("before-extract-data");c.isDefaultPrevented()||(this._extractData(),this.trigger("extract-data"));c=this.trigger("before-transform-markup");c.isDefaultPrevented()||(this._transformMarkup(),this.trigger("transform-markup"));c=this.trigger("before-attach-behavior");c.isDefaultPrevented()||(this._attachBehavior(),this.trigger("attach-behavior"));c=this.trigger("before-ready");c.isDefaultPrevented()||(this._ready(),this.trigger("ready"))},_setUp:function(b,c){this.$element=a(b);return c},
_initializePlugins:function(a){for(var a=a||{},b=((typeof a.useDefaultPlugins==="undefined"||a.useDefaultPlugins)&&this.defaultPlugins?this.defaultPlugins:[]).concat(a.plugins||[]),b=b.sort(function(a,b){a=typeof a.priority==="number"?a.priority:50;b=typeof b.priority==="number"?b.priority:50;return a-b}),c=0;c<b.length;c++){var k=b[c];k&&k.initialize&&k.initialize(this,a)}this.plugins=b},_extractData:function(){},_transformMarkup:function(){},_attachBehavior:function(){},_ready:function(){}});b.Widget=
c;b.widget=function(c,f,g){var k=g&&f||b.Widget,g=g||f||{},f=function(){k.apply(this,arguments);this._widgetName=c};b.inherit(f,k);a.extend(f.prototype,g);f.prototype.defaultOptions=a.extend({},k.prototype.defaultOptions,g.defaultOptions);var g=c.split("."),h=g.length;namespace=h>1&&g[0]||"Widget";c=g[h-1];b[namespace][c]=f}})(jQuery,WebPro,window,document);
(function(a,b){b.widget("Widget.Button",b.Widget,{defaultOptions:{hoverClass:"wp-button-hover",activeClass:"wp-button-down",disabledClass:"wp-button-disabled",disabled:!1,callback:null},_attachBehavior:function(){var b=this,d=function(f){b.$element.removeClass(b.options.activeClass);!b.options.disabled&&b.options.callback&&b.mouseDown&&b.options.callback.call(this,f);a(b.$element).off("mouseup pointerup",d);b.mouseDown=!1};this.mouseDown=!1;this.$element.on("mouseover",function(){b.options.disabled||
b.$element.addClass(b.options.hoverClass+(b.mouseDown?" "+b.options.activeClass:""))}).on("mouseleave",function(){b.$element.removeClass(b.options.hoverClass+" "+b.options.activeClass);a(b.$element).off("mouseup",d)}).on("mousedown pointerdown",function(){if(!b.options.disabled)b.mouseDown=!0,b.$element.addClass(b.options.activeClass),a(b.$element).on("mouseup pointerup",d)});this.disabled(this.options.disabled)},disabled:function(a){if(typeof a==="boolean")this.options.disabled=a,this.$element[a?
"addClass":"removeClass"](this.options.disabledClass);return this.options.disabled}});a.fn.wpButton=function(a){this.each(function(){new b.Widget.Button(this,a)});return this}})(jQuery,WebPro,window,document);
(function(a,b){b.widget("Widget.RadioGroup",b.Widget,{_widgetName:"radio-group",defaultOptions:{defaultIndex:0,hoverClass:"wp-radio-hover",downClass:"wp-radio-down",disabledClass:"wp-radio-disabled",checkedClass:"wp-radio-checked",disabled:!1,toggleStateEnabled:!1},_attachBehavior:function(){var a=this;this.buttons=[];this.activeElement=null;this.activeIndex=-1;this.$element.each(function(){a.buttons.push(a._addButtonBehavior(this))});this.disabled(this.options.disabled)},_addButtonBehavior:function(a){var d=
this,f=new b.Widget.Button(a,{hoverClass:this.options.hoverClass,downClass:this.options.downClass,disabledClass:this.options.disabledClass,callback:function(b){return d._handleClick(b,f,a)}});return f},_handleClick:function(a,b,f){this.options.disabled||this.checkButton(f)},_getElementIndex:function(b){return b?a.inArray(b,this.$element.get()):-1},_getElementByIndex:function(a){return a>=0?this.$element.eq(a)[0]:null},_getElement:function(a){return typeof a==="number"?this._getElementByIndex(a):a},
checkButton:function(b){var b=this._getElement(b),d=this.activeElement,f=this.options.checkedClass;b!==d?(d&&a(d).removeClass(f),b&&a(b).addClass(f)):this.options.toggleStateEnabled&&b&&(a(b).removeClass(f),b=null);this.activeElement=b;this.activeIndex=this._getElementIndex(b)},disabled:function(b){if(typeof b==="boolean")this.disabled=b,a.each(this.buttons,function(){this.disabled(b)});return this.options.disabled}});a.fn.wpRadioGroup=function(a){new b.Widget.RadioGroup(this,a);return this}})(jQuery,
WebPro,window,document);
(function(a,b){b.widget("Widget.TabGroup",b.Widget.RadioGroup,{defaultOptions:{defaultIndex:0,hoverClass:"wp-tab-hover",downClass:"wp-tab-down",disabledClass:"wp-tab-disabled",checkedClass:"wp-tab-active",disabled:!1,toggleStateEnabled:!1},selectTab:function(a){this.checkButton(a)},checkButton:function(a){var b=this._getElement(a),f=this._getElementIndex(b),b={tab:b,tabIndex:f};this.trigger("wp-tab-before-select",b);this._super.prototype.checkButton.apply(this,arguments);this.trigger("wp-tab-select",b)}});
a.fn.wpTabGroup=function(a){new b.Widget.TabGroup(this,a);return this}})(jQuery,WebPro,window,document);
(function(a,b){b.widget("Widget.PanelGroup",b.Widget,{_widgetName:"panel-group",defaultOptions:{defaultIndex:0,panelClass:"wp-panel",activeClass:"wp-panel-active",toggleStateEnabled:!1,tabGroups:null},_setUp:function(){var a=this;this.tabGroups=[];this._tabCallback=function(b,f){a._handleTabSelect(b,f)};this.showLock=0;this.tabDriver=null;return this._super.prototype._setUp.apply(this,arguments)},_attachBehavior:function(){this.activeElement=null;this.activeIndex=-1;this.$element.addClass(this.options.panelClass);
var a=this.options.defaultIndex;typeof a==="number"&&a>=0&&this.showPanel(a);this.addTabGroup(this.options.tabGroups)},_getElementIndex:function(b){return b?a.inArray(b,this.$element.get()):-1},_getElementByIndex:function(a){return this.$element.eq(a)[0]},_getElement:function(a){return typeof a==="number"?this._getElementByIndex(a):a},showPanel:function(b){if(!this.showLock){++this.showLock;var d=this._getElement(b),f=this.activeElement,g=this.options.activeClass;if(d)if(d!==f){b={panel:d,panelIndex:this._getElementIndex(d)};
this.trigger("wp-panel-before-show",b);f&&this.hidePanel(f);a(d).addClass(g);this.activeElement=d;this.activeIndex=this._getElementIndex(d);d=this.tabGroups;for(f=0;f<d.length;f++)g=d[f],g!==this.tabDriver&&g.selectTab(this.activeIndex);this.trigger("wp-panel-show",b)}else this.options.toggleStateEnabled&&this.hidePanel(d);--this.showLock}},hidePanel:function(b){if(b=typeof b==="number"?this.$element.eq(b)[0]:b){var d={panel:b,panelIndex:this._getElementIndex(b)};this.trigger("wp-panel-before-hide",
d);a(b).removeClass(this.options.activeClass);if(b===this.activeElement)this.activeElement=null,this.activeIndex=-1;this.trigger("wp-panel-hide",d)}},_handleTabSelect:function(a,b){if(!this.showLock)this.tabDriver=a.target,this.showPanel(b.tabIndex),this.tabDriver=null},addTabGroup:function(c){if(c)for(var c=b.ensureArray(c),d=c.length,f=0;f<d;f++){var g=c[f];a.inArray(this.tabGroups,g)===-1&&(this.tabGroups.push(g),g.selectTab(this.activeIndex),g.bind("wp-tab-select",this._tabCallback))}},removeTabGroup:function(c){for(var c=
b.ensureArray(c),d=c.length,f=0;f<d;f++){var g=c[f];sets=this.tabGroups;loc=a.inArray(sets,g);loc!==-1&&sets.splice(loc,1)}}});a.fn.wpPanelGroup=function(a){new b.Widget.PanelGroup(this,a);return this}})(jQuery,WebPro,window,document);
(function(a,b){b.widget("Widget.Disclosure",b.Widget,{defaultOptions:{widgetClassName:"wp-disclosure-panels",tabClassName:"wp-disclosure-panels-tab",tabHoverClassName:"wp-disclosure-panels-tab-hover",tabDownClassName:"wp-disclosure-panels-tab-down",panelClassName:"wp-disclosure-panels-panel",tabActiveClassName:"wp-disclosure-panels-tab-active",panelActiveClassName:"wp-disclosure-panels-panel-active",defaultIndex:0,toggleStateEnabled:!1},_attachBehavior:function(){var a=this.$element[0],d=this.options.widgetClassName,
f=b.scopedFind(a,"."+this.options.tabClassName,d,a),a=b.scopedFind(a,"."+this.options.panelClassName,d,a);this.tabs=new b.Widget.TabGroup(f,{hoverClass:this.options.tabHoverClassName,downClass:this.options.tabDownClassName,checkedClass:this.options.tabActiveClassName,toggleStateEnabled:this.options.toggleStateEnabled});this.panels=new b.Widget.PanelGroup(a,{panelClass:this.options.panelClassName,activeClass:this.options.panelActiveClassName,defaultIndex:this.options.defaultIndex,toggleStateEnabled:this.options.toggleStateEnabled});
this.panels.addTabGroup(this.tabs)}});b.widget("Widget.TabbedPanels",b.Widget.Disclosure,{defaultOptions:{widgetClassName:"wp-tabbed-panels-panels",tabClassName:"wp-tabbed-panels-panels-tab",tabHoverClassName:"wp-tabbed-panels-panels-tab-hover",tabDownClassName:"wp-tabbed-panels-panels-tab-down",tabActiveClassName:"wp-tabbed-panels-panels-tab-active",panelClassName:"wp-tabbed-panels-panels-panel",panelActiveClassName:"wp-tabbed-panels-panels-panel-active",toggleStateEnabled:!1}});b.widget("Widget.Accordion",
b.Widget.Disclosure,{defaultOptions:{widgetClassName:"wp-accordion",tabClassName:"wp-accordion-tab",tabHoverClassName:"wp-accordion-tab-hover",tabDownClassName:"wp-accordion-tab-down",tabActiveClassName:"wp-accordion-tab-active",panelClassName:"wp-accordion-panel",panelActiveClassName:"wp-accordion-panel-active",toggleStateEnabled:!1}})})(jQuery,WebPro,window,document);
(function(a,b){b.Widget.Disclosure.DisplayPropertyTransitionPlugin={defaultOptions:{},initialize:function(b,d){var f=this;a.extend(d,a.extend({},f.defaultOptions,d));b.bind("attach-behavior",function(){f._attachBehavior(b)})},_attachBehavior:function(a){var a=a.panels,b=a.$element,f=a.activeIndex;a.bind("wp-panel-show",function(a,b){b.panel.style.display="block"});a.bind("wp-panel-hide",function(a,b){b.panel.style.display="none"});b.each(function(a){this.style.display=a!==f?"none":"block"})}};b.Widget.Disclosure.AccordionTransitionPlugin=
{defaultOptions:{transitionDirection:"vertical",transitionDuration:500,dispatchTransitionEvents:!0},initialize:function(b,d){var f=this;a.extend(d,a.extend({},f.defaultOptions,d));b.bind("attach-behavior",function(){f._attachBehavior(b)})},_attachBehavior:function(b){var d=this,f=b.panels,g=f.$element,k=f.activeIndex,h=b.options.transitionDirection,l=b.options.widgetClassName==="AccordionWidget"?a(g[0]).closest("*[data-rotate]"):null;if(l&&l.length>0)b.options.marginBottom=Muse.Utils.getCSSIntValue(l,
"margin-bottom"),b.options.originalHeight=l[0].scrollHeight;b.options.rotatedAccordion=l;f.bind("wp-panel-show",function(a,g){d._showPanel(b,g)});f.bind("wp-panel-hide",function(a,g){d._hidePanel(b,g)});g.each(function(b){if(b!==k){a(this).css("overflow","hidden");if(h==="vertical"||h==="both")this.style.height="0";if(h==="horizontal"||h==="both")this.style.width="0"}})},_updateMarginBottomForRotatedAccordion:function(a){a.options.rotatedAccordion.css("margin-bottom",Math.round(a.options.marginBottom-
(a.options.rotatedAccordion[0].scrollHeight-a.options.originalHeight))+"px")},_transitionPanel:function(b,d,f){a("body").trigger("wp-page-height-change",d-b);if((b=f.options.rotatedAccordion)&&b.length>0){if(f.options.originalHeight==0&&"undefined"!==typeof d)f.options.marginBottom=Muse.Utils.getCSSIntValue(b,"margin-bottom"),f.options.originalHeight=b[0].scrollHeight;this._updateMarginBottomForRotatedAccordion(f)}},_showPanel:function(b,d){var f=b.options,g=f.transitionDirection,k=a(d.panel),h={},
l=f.dispatchTransitionEvents,j=this,i=k.height(),n=function(a){a=parseInt(a.elem.style.height);j._transitionPanel(i,a,b);i=a};if(g==="vertical"||g==="both")h.height=k[0].scrollHeight+"px";if(g==="horizontal"||g==="both")h.width=k[0].scrollWidth+"px";k.stop(!0,!0).queue("animationFrameFx",a.animationFrameFx).animate(h,{duration:f.transitionDuration,progress:l?n:null,queue:"animationFrameFx",complete:function(){var a={overflow:""};if(g==="vertical"||g==="both")a.height="auto";if(g==="horizontal"||g===
"both")a.width="auto";k.css(a);(a=b.options.rotatedAccordion)&&a.length>0&&j._updateMarginBottomForRotatedAccordion(b)}}).dequeue("animationFrameFx")},_hidePanel:function(b,d){var f=b.options,g=f.transitionDirection,k=a(d.panel),h={},l=f.dispatchTransitionEvents,j=this,i=k.height(),n=function(a){a=parseInt(a.elem.style.height);j._transitionPanel(i,a,b);i=a};if(g==="vertical"||g==="both")h.height="0";if(g==="horizontal"||g==="both")h.width="0";k.stop(!0,!0).queue("animationFrameFx",a.animationFrameFx).animate(h,
{duration:f.transitionDuration,queue:"animationFrameFx",progress:l?n:null,complete:function(){k.css("overflow","hidden");var a=b.options.rotatedAccordion;a&&a.length>0&&j._updateMarginBottomForRotatedAccordion(b)}}).dequeue("animationFrameFx")}}})(jQuery,WebPro,window,document);
(function(a,b){b.widget("Widget.SlideShowBase",b.Widget,{_widgetName:"slideshow-base",defaultOptions:{displayInterval:6E3,autoPlay:!1,loop:!0,playOnce:!1},_setUp:function(){var a=this;this._ssTimer=0;this._ssTimerTriggered=!1;this._ssTimerCallback=function(){a._ssTimerTriggered=!0;a.next();a._ssTimerTriggered=!1};return b.Widget.prototype._setUp.apply(this,arguments)},_ready:function(){this.options.autoPlay&&this.play()},play:function(a){e=this.trigger("wp-slideshow-before-play");e.isDefaultPrevented()||
(this._startTimer(!1,a),this.trigger("wp-slideshow-play"))},stop:function(){e=this.trigger("wp-slideshow-before-stop");e.isDefaultPrevented()||(this._stopTimer(),this.trigger("wp-slideshow-stop"))},isPlaying:function(){return this._ssTimer!==0},_startTimer:function(a,b){this._stopTimer();var f=b?0:this.options.displayInterval;a&&(f+=this.options.transitionDuration);this._ssTimer=setTimeout(this._ssTimerCallback,f)},_stopTimer:function(){this._ssTimer&&clearTimeout(this._ssTimer);this._ssTimer=0},
_executeCall:function(a,b){e=this.trigger("wp-slideshow-before-"+a);e.isDefaultPrevented()||(this["_"+a].apply(this,b)&&this.stop(),this.isPlaying()&&this._startTimer(!0),this.trigger("wp-slideshow-"+a))},first:function(){return this._executeCall("first",arguments)},last:function(){return this._executeCall("last",arguments)},previous:function(){return this._executeCall("previous",arguments)},next:function(){return this._executeCall("next",arguments)},goTo:function(){return this._executeCall("goTo",
arguments)},close:function(){return this._executeCall("close",arguments)},_first:function(){},_last:function(){},_previous:function(){},_next:function(){},_goTo:function(){},_close:function(){}})})(jQuery,WebPro,window,document);
(function(a,b){b.widget("Widget.ContentSlideShow",b.Widget.SlideShowBase,{_widgetName:"content-slideshow",defaultOptions:{slideshowClassName:"wp-slideshow",clipClassName:"wp-slideshow-clip",viewClassName:"wp-slideshow-view",slideClassName:"wp-slideshow-slide",slideLinkClassName:"wp-slideshow-slide-link",firstBtnClassName:"wp-slideshow-first-btn",lastBtnClassName:"wp-slideshow-last-btn",prevBtnClassName:"wp-slideshow-prev-btn",nextBtnClassName:"wp-slideshow-next-btn",playBtnClassName:"wp-slideshow-play-btn",
stopBtnClassName:"wp-slideshow-stop-btn",closeBtnClassName:"wp-slideshow-close-btn",playingClassName:"wp-slideshow-playing"},_findWidgetElements:function(a){var d=this.$element[0];return b.scopedFind(d,a,this.options.slideshowClassName,d)},_attachBtnHandler:function(a,b){var f=this;this["$"+b+"Btn"]=this._findWidgetElements("."+a).bind("click",function(a){f[b]();a.preventDefault()})},_getAjaxSrcForImage:function(a){return a.data("src")},_reprioritizeImageLoadingIfRequired:function(b){!this._isLoaded(b)&&
this._cssilLoader&&!this._cssilLoader.isQueueEmpty()&&(b=a(this.slides.$element[b]),this._cssilLoader.reprioritize(this._getAjaxSrcForImage(b.is("img")?b:b.find("img")),this.isPlaying()))},_attachBehavior:function(){var a=this,d=this.options;this._super.prototype._attachBehavior.call(this);this._panelShowCallback=function(){a._ssTimerTriggered||a.isPlaying()&&a._startTimer(!1)};this.$element.addClass(d.slideshowClassName);var f=this._findWidgetElements("."+d.slideClassName),g=this._findWidgetElements("."+
d.slideLinkClassName),k=d.event==="click"&&d.deactivationEvent==="mouseout_click";this.slides=new b.Widget.PanelGroup(f,{defaultIndex:d.defaultIndex||0,toggleStateEnabled:k});this.slides.bind("wp-panel-show",this._panelShowCallback);this.tabs=null;if(g.length)this.tabs=new b.Widget.TabGroup(g,{defaultIndex:d.defaultIndex||0,toggleStateEnabled:k}),this.slides.addTabGroup(this.tabs);this.slides.bind("wp-panel-before-show",function(b,g){a._reprioritizeImageLoadingIfRequired(g.panelIndex)});this._attachBtnHandler(d.firstBtnClassName,
"first");this._attachBtnHandler(d.lastBtnClassName,"last");this._attachBtnHandler(d.prevBtnClassName,"previous");this._attachBtnHandler(d.nextBtnClassName,"next");this._attachBtnHandler(d.playBtnClassName,"play");this._attachBtnHandler(d.stopBtnClassName,"stop");this._attachBtnHandler(d.closeBtnClassName,"close");this.bind("wp-slideshow-play",function(){this.$element.addClass(d.playingClassName)});this.bind("wp-slideshow-stop",function(){this.$element.removeClass(d.playingClassName)})},_first:function(){this.slides.showPanel(0)},
_last:function(){var a=this.slides;a.showPanel(a.$element.length-1)},_previous:function(){var a=this.slides,b=a.$element.length,f=a.activeIndex,b=(f<1?b:f)-1;!this.options.loop&&0==f?this.isPlaying()&&this.stop():a.showPanel(b)},_next:function(){var a=this.slides,b=a.activeIndex,f=(b+1)%a.$element.length;!this.options.loop&&0==f?this.isPlaying()&&this.stop():this.options.playOnce&&0==f&&this.isPlaying()?this.stop():(!this.isPlaying()||this._isLoaded(b)&&this._isLoaded(f))&&a.showPanel(f)},_goTo:function(){var a=
this.slides;a.showPanel.apply(a,arguments)},_close:function(){var a=this.slides;a.hidePanel(a.activeElement)},_isLoaded:function(b){if(this._csspIsImageSlideShow&&(b=a(this.slides.$element[b]),b=b.is("img")?b:b.find("img"),b.length>0&&(b.hasClass(this.options.imageIncludeClassName)||!b[0].complete)))return!1;return!0}})})(jQuery,WebPro,window,document);
(function(a,b,c,d,f){b.Widget.ContentSlideShow.fadingTransitionPlugin={defaultOptions:{transitionDuration:500},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d.attachBehavior(b)})},attachBehavior:function(b){var k=this,h=b.slides,l=h.$element,j=h.activeIndex,i=b._findWidgetElements("."+b.options.viewClassName);h.bind("wp-panel-show",function(c,d){k._showElement(b,a(d.panel));b.options.contentLayout_runtime==="stack"&&k._showElement(b,
b.$closeBtn)}).bind("wp-panel-hide",function(c,d){k._hideElement(b,a(d.panel))});b.options.contentLayout_runtime==="stack"&&b.bind("wp-slideshow-close",function(){k._hideElement(b,b.$closeBtn)});for(var n=0;n<l.length;n++)if(n!==j)l[n].style.display="none";if(b.options.elastic==="fullWidth"){var o=a(c),p=a(d.body),q=function(c){c===f&&(c=Math.max(o.width(),parseInt(p.css("min-width"))));b.options.contentLayout_runtime!=="lightbox"&&i.css("left",i.position().left-i.offset().left);i.width(c);k._showElement(b,
a(h.activeElement))};q();for(n=0;n<l.length;n++){var m=a(l[n]);m.width("100%");m.addClass("borderbox")}if(b.options.contentLayout_runtime==="lightbox")b._fstpPositionSlides=q;else o.on("orientationchange resize",function(){q()})}j===-1&&b.options.contentLayout_runtime==="stack"&&b.$closeBtn.hide();if(Muse.Browser.Features.Touch&&b.options.enableSwipe===!0){var r=b.options.transitionDuration;b._ftpSwipeNoInterrupt=!1;l.each(function(){var c=a(this);c.data("opacity",c.css("opacity"));var d=Muse.Utils.getCanvasDirection(c,
"horizontal"),h=d.dir==="horizontal",f=d.reverse;if(d=c.swipe.defaults.excludedElements){var d=d.split(/\s*,\s*/),j=d.indexOf("a");if(0<=j)d.splice(j,1),c.swipe.defaults.excludedElements=d.join(", ")}c.swipe({triggerOnTouchEnd:!0,allowPageScroll:h?"vertical":"horizontal",threshold:75,swipeStatus:function(a,c,d,j){b.stop();if(c=="move"&&(h&&(d=="left"||d=="right")||!h&&(d=="up"||d=="down")))k._scrollTo(b,-1,j*(!f&&(d=="left"||d=="up")||f&&(d=="right"||d=="down")?1:-1),0);else if(c=="cancel")k._scrollTo(b,
b.slides.activeIndex,0,r);else if(c=="end"){a=b.slides.activeIndex;c=-1;if(h&&(d=="right"&&!f||d=="left"&&f)||!h&&(d=="down"&&!f||d=="up"&&f))c=a-1<0?l.length-1:a-1;else if(h&&(d=="left"&&!f||d=="right"&&f)||!h&&(d=="up"&&!f||d=="down"&&f))c=a+1>l.length-1?0:a+1;c!=-1&&k._scrollTo(b,c,0,r)}}})})}},_showElement:function(a,b){var c=!1,d=function(){c||(c=!0,b.show().css("opacity",""))},f=setTimeout(d,a.options.transitionDuration+10);b.stop(!1,!0).fadeIn(a.options.transitionDuration,function(){clearTimeout(f);
d()})},_hideElement:function(a,b){var c=!1,d=function(){c||(c=!0,b.hide().css("opacity",""))},f=setTimeout(d,a.options.transitionDuration+10);b.stop(!1,!0).fadeOut(a.options.transitionDuration,function(){clearTimeout(f);d()})},_scrollTo:function(b,c,d,f){if(!b._ftpSwipeNoInterrupt){var j=b.slides.$element,i=b.slides.activeIndex,n=c==-1;c==-1&&(c=d<0?i-1<0?j.length-1:i-1:i+1>j.length-1?0:i+1);var o=a(j[i]),p=a(j[c]);if(!n&&d==0||i==c){b._ftpSwipeNoInterrupt=!0;var q=0,m=!1,r=function(){if(!m&&(m=!0,
p.show().css("opacity",""),c!=i&&b.slides.showPanel(c),++q==j.length))b._ftpSwipeNoInterrupt=!1};if(p.css("opacity")!=p.data("opacity")){var t=setTimeout(r,f+10);p.stop(!1,!0).animate({opacity:p.data("opacity")},f,function(){clearTimeout(t);r()})}else r();j.each(function(d){var h=a(this),o=!1,i=function(){if(!o&&(o=!0,h.hide().css("opacity",""),++q==j.length))b._ftpSwipeNoInterrupt=!1},p;d!=c&&(h.css("display")!="none"&&h.css("opacity")!=0?(p=setTimeout(i,f+10),h.stop(!1,!0).animate({opacity:0},f,
function(){clearTimeout(p);i()})):i())})}else d=Math.abs(d),n=o.width(),d>n&&(d=n),d=p.data("opacity")*(d/n),n=o.data("opacity")*(1-d),o.stop(!1,!0).animate({opacity:n},f),p.stop(!1,!0).show().animate({opacity:d},f)}}};b.Widget.ContentSlideShow.filmstripTransitionPlugin={defaultOptions:{transitionDuration:500,transitionStyle:"horizontal"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d.attachBehavior(b)})},attachBehavior:function(b){var k=
this,h=a(c),l=a(d.body),j=function(){return i.elastic==="fullWidth"?Math.max(h.width(),parseInt(l.css("min-width"))):q.width()},i=b.options,n=i.transitionStyle==="horizontal",o=b.slides,p=o.$element,q=b._findWidgetElements("."+i.clipClassName),m=b._findWidgetElements("."+i.viewClassName),r=j(),t=q.height(),x={top:"0",left:"0"},y=q.css("position");y!=="absolute"&&y!=="fixed"&&i.elastic!=="fullScreen"&&q.css("position","relative");m.css("position")!=="absolute"&&(x.position="relative");b._fstp$Clip=
q;b._fstp$View=m;b._fstpStyleProp=n?"left":"top";b._fstpStylePropZero=n?"top":"left";o.bind("wp-panel-show",function(a,c){k._goToSlide(b,c.panel,i.transitionDuration);b.options.contentLayout_runtime==="stack"&&b.$closeBtn.stop(!0).fadeIn(i.transitionDuration)});b.options.contentLayout_runtime==="stack"&&b.bind("wp-slideshow-close",function(){q.css({opacity:0.99}).stop(!0).animate({opacity:0},{queue:!1,duration:i.transitionDuration,complete:function(){x[b._fstpStyleProp]=(n?q.width():q.height())+"px";
x[b._fstpStylePropZero]="0";m.css(x);q.css({opacity:""})}});b.$closeBtn.stop(!0).fadeOut(i.transitionDuration)});b._fstpRequestType=null;b.bind("wp-slideshow-before-previous wp-slideshow-before-next",function(a){b._fstpRequestType=a.type.replace(/.*-/,"");b._fstpOldActiveIndex=b.slides.activeIndex}).bind("wp-slideshow-previous wp-slideshow-next",function(){b._fstpRequestType=null;b._fstpOldActiveIndex=-1});var F=function(a,c){if(a===f||c===f)a=j(),c=q.height();i.elastic==="fullWidth"&&(c=q.height(),
q.width(a),i.contentLayout_runtime!=="lightbox"&&q.css("left",q.position().left-q.offset().left),m.width(a));for(var d=0,h=n?a:c,l=b._fstpStyleProp,r=b._fstpStylePropZero,t=0;t<p.length;t++){var v=p[t].style;v[r]="0";v[l]=d+"px";v.margin="0";v.position="absolute";d+=h}k._goToSlide(b,o.activeElement,0);return d},y=F();if(i.elastic==="fullWidth")for(var v=0;v<p.length;v++){var C=a(p[v]);C.width("100%");C.addClass("borderbox")}if(i.elastic!=="off")if(i.contentLayout_runtime==="lightbox")b._fstpPositionSlides=
F;else h.on("orientationchange resize",function(){F()});else x[n?"width":"height"]=y+"px",x[n?"height":"width"]=(n?t:r)+"px";o.activeElement||(x[b._fstpStyleProp]=(n?r:t)+"px",x[b._fstpStylePropZero]="0",b.options.contentLayout_runtime==="stack"&&b.$closeBtn.hide());x.overflow="visible";m.css(x);k._goToSlide(b,o.activeElement,i.transitionDuration)},_goToSlide:function(b,c,d){if(b){var f=a(c),j=b._fstp$View,i=b._fstpStyleProp,n=i==="left"?"offsetLeft":"offsetTop",o=i==="left"?"offsetWidth":"offsetHeight",
p=c?-c[n]:b._fstp$Clip[0][o],q={};q[i]=p+"px";var m=b._fstpRequestType,r=b._fstpOldActiveIndex;if(m&&r!==-1){var t=b.slides.activeIndex,x=b.slides.$element.length-1;if(t!==r){var y=0;m==="previous"&&r===0&&t===x?y=-c[o]:m==="next"&&r===x&&t===0&&(b=b.slides.$element[r],y=b[n]+b[o]);y&&(q[i]=-y+"px",f.css(i,y+"px"))}}j.stop(!1,!0).animate(q,d,function(){y&&(f.css(i,-p+"px"),j.css(i,p+"px"))})}}};b.Widget.ContentSlideShow.alignPartsToPagePlugin={defaultOptions:{alignPartToPageClassName:"wp-slideshow-align-part-to-page"},
initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d.attachBehavior(b)})},attachBehavior:function(b){if(!("fullWidth"!==b.options.elastic||!b.$element.hasClass("align_parts_to_page")||"fixed"!==b.$element.css("position")||b.options.contentLayout_runtime==="lightbox")){var d=a(c),f=a("#page"),l=b.options,j=function(){var c=f.offset().left+"px";a("."+l.alignPartToPageClassName,b.$element).each(function(){a(this).css("margin-left",c)})};
b.$element.children().each(function(){var b=a(this);0<a("."+l.viewClassName,b).length||b.addClass(l.alignPartToPageClassName)});j();d.on("orientationchange resize",function(){j()})}}};b.Widget.ContentSlideShow.swipeTransitionPlugin={defaultOptions:{transitionDuration:500,transitionStyle:"horizontal"},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b.bind("attach-behavior",function(){d.attachBehavior(b)})},attachBehavior:function(b){var k=this,h=a(c),l=a(d.body),j=function(){return i.elastic===
"fullWidth"?Math.max(h.width(),parseInt(l.css("min-width"))):q.width()},i=b.options,n=i.transitionStyle==="horizontal",o=b.slides,p=o.$element,q=b._findWidgetElements("."+i.clipClassName),m=b._findWidgetElements("."+i.viewClassName),r=j(),t=q.height(),x=function(a,b){if(a===f||b===f)a=j(),b=q.height();return n?a:b},y=x();viewProps={top:"0",left:"0"};q.css("position")!=="absolute"&&i.elastic!=="fullScreen"&&q.css("position","relative");m.css("position")!=="absolute"&&(viewProps.position="relative");
b._fstp$Clip=q;b._fstp$View=m;b._fstpStyleProp=n?"left":"top";b._fstpStylePropZero=n?"top":"left";o.bind("wp-panel-show",function(){var a=b.slides.activeIndex*x(),c=b.options.transitionDuration;a==0&&b.slides.activeIndex==0&&!i.shuffle&&b.isPlaying()&&(c=0);k._scrollTo(b,a,c);b.options.contentLayout_runtime==="stack"&&b.$closeBtn.stop(!0).fadeIn(c)});b.options.contentLayout_runtime==="stack"&&b.bind("wp-slideshow-close",function(){q.css({opacity:0.99}).stop(!0).animate({opacity:0},{queue:!1,duration:i.transitionDuration,
complete:function(){k._scrollTo(b,-x(),0);q.css({opacity:""})}});b.$closeBtn.stop(!0).fadeOut(b.options.transitionDuration)});b._fstpRequestType=null;b.bind("wp-slideshow-before-previous wp-slideshow-before-next",function(a){b._fstpRequestType=a.type.replace(/.*-/,"");b._fstpOldActiveIndex=b.slides.activeIndex}).bind("wp-slideshow-previous wp-slideshow-next",function(){b._fstpRequestType=null;b._fstpOldActiveIndex=-1});var F=function(a,c){if(a===f||c===f)a=j(),c=q.height();i.elastic==="fullWidth"&&
(c=q.height(),q.width(a),i.contentLayout_runtime!=="lightbox"&&q.css("left",q.position().left-q.offset().left),m.width(a));for(var d=0,h=n?a:c,l=b._fstpStyleProp,r=b._fstpStylePropZero,t=0;t<p.length;t++){var s=p[t].style;s[r]="0";s[l]=d+"px";s.margin="0";s.position="absolute";d+=h}m.css(n?"width":"height",d);k._scrollTo(b,o.activeIndex*h,0);return d},v=F();if(i.elastic==="fullWidth")for(var C=0;C<p.length;C++){var z=a(p[C]);z.width("100%");z.addClass("borderbox")}if(i.elastic!=="off")if(i.lightboxEnabled_runtime)b._fstpPositionSlides=
F;else h.on("orientationchange resize",function(){F()});else viewProps[n?"width":"height"]=v+"px",viewProps[n?"height":"width"]=(n?t:r)+"px";viewProps.overflow="visible";m.css(viewProps);var r=Muse.Utils.getCanvasDirection(m,i.transitionStyle),s=r.dir==="horizontal",E=r.reverse,M=b.options.transitionDuration;if(r=m.swipe.defaults.excludedElements)if(r=r.split(/\s*,\s*/),t=r.indexOf("a"),0<=t)r.splice(t,1),m.swipe.defaults.excludedElements=r.join(", ");m.swipe({triggerOnTouchEnd:!0,allowPageScroll:s?
"vertical":"horizontal",threshold:75,swipeStatus:function(a,c,d,f){b.stop();y=x();if(c=="move"&&(s&&(d=="left"||d=="right")||!s&&(d=="up"||d=="down")))d=y*b.slides.activeIndex+f*(!E&&(d=="left"||d=="up")||E&&(d=="right"||d=="down")?1:-1),k._scrollTo(b,d,0);else if(c=="cancel")d=y*b.slides.activeIndex,k._scrollTo(b,d,M);else if(c=="end"){a=-1;if(s&&(d=="right"&&!E||d=="left"&&E)||!s&&(d=="down"&&!E||d=="up"&&E))a=Math.max(b.slides.activeIndex-1,0);else if(s&&(d=="left"&&!E||d=="right"&&E)||!s&&(d==
"up"&&!E||d=="down"&&E))a=Math.min(b.slides.activeIndex+1,m.children().length-1);a!=-1&&(d=y*a,k._scrollTo(b,d,M),a!=b.slides.activeIndex&&b.slides.showPanel(a))}}});o.activeElement?(r=o.activeIndex*y,k._scrollTo(b,r,0)):(k._scrollTo(b,-y,0),b.options.contentLayout_runtime==="stack"&&b.$closeBtn.hide())},_scrollTo:function(a,b,c){var g;var d=Muse.Browser.Features.checkCSSFeature("transition-duration"),f=Muse.Browser.Features.checkCSSFeature("transform");if(!(d===!1||f===!1)){var i=a._fstp$View.get(0);
i.style[(d===!0?"":"-"+d.toLowerCase()+"-")+"transition-duration"]=(c/1E3).toFixed(1)+"s";b=-b;g=(c=a.options.transitionStyle==="horizontal")?b:0,a=g;b=c?0:b;f=(f===!0?"":"-"+f.toLowerCase()+"-")+"transform";c="translate3d("+a+"px, "+b+"px, 0px)";d=i.style[f];i.style[f]=c;i.style[f]===d&&d!==c&&(i.style[f]="translate("+a+"px, "+b+"px)")}}};b.Widget.ContentSlideShow.slideImageIncludePlugin={defaultOptions:{imageIncludeClassName:"wp-slideshow-slide-image-include",slideLoadingClassName:"wp-slideshow-slide-loading"},
initialize:function(c,d){var f=this;a.extend(d,a.extend({},f.defaultOptions,d));c._cssilLoader=new b.ImageLoader;c.bind("attach-behavior",function(){f._attachBehavior(c)})},_attachBehavior:function(a){for(var b=this,c=a._cssilLoader,d=a._findWidgetElements("."+a.options.slideClassName),f=d.length,i="."+a.options.imageIncludeClassName,n=a.options.slideLoadingClassName,o=function(c,d,f,h){b._handleImageLoad(a,c,d,f,h)},p=0;p<f;p++){var q=d.eq(a._shuffleArray?a._shuffleArray[p]:p),m=q.is("img")?q:q.find(i),
r=m[0];if(r){var t=a._getAjaxSrcForImage(m)||r.href;if(t)m={width:m.data("width"),height:m.data("height"),$ele:m,$slide:q},r.style.visibility="hidden",c.add(t,{callback:o,data:m}),q.addClass(n)}}a._cssilLoader.start()},_handleImageLoad:function(a,b,c,d,f){var i=f.$ele,n=i[0];n.src=b;a.options.elastic!=="off"?(i.data("imageWidth",c),i.data("imageHeight",d),a._csspPositionImage(n,a.options.heroFitting,a.options.elastic,c,d)):(n.width=f.width||c,n.height=f.height||d);n.style.visibility="";i.removeClass(a.options.imageIncludeClassName);
f.$slide.removeClass(a.options.slideLoadingClassName);a.isPlaying()&&a.slides.$element[a.slides.activeIndex]==f.$slide[0]&&a._startTimer(!1)}};b.Widget.ContentSlideShow.shufflePlayPlugin={defaultOptions:{randomDefaultIndex:!0},initialize:function(b,c){var d=this;a.extend(c,a.extend({},d.defaultOptions,c));b._shuffleArray=[];b._shuffleNextDict={};b._realNext=b._next;b._next=function(){d._handleNext(b)};b._shufflePlayCount=1;b.bind("before-attach-behavior",function(){d._reshuffle(b);if(c.randomDefaultIndex&&
typeof c.defaultIndex==="undefined")b.options.defaultIndex=b._shuffleArray[0]})},_fisherYatesArrayShuffle:function(a){if(a&&a.length)for(var b=a.length;--b;){var c=Math.floor(Math.random()*(b+1)),d=a[c];a[c]=a[b];a[b]=d}},_reshuffle:function(a){var b=a._shuffleArray,c={},d=a.slides?a.slides.$element.length:a._findWidgetElements("."+a.options.slideClassName).length;if(b.length!==d)for(var f=b.length=0;f<d;f++)b[f]=f;this._fisherYatesArrayShuffle(b);for(f=0;f<d;f++)c[b[f]]=b[(f+1)%d];a._shuffleNextDict=
c;a._shufflePlayCount=1},_handleNext:function(a){if(a.isPlaying()){var b=a.slides.activeIndex,c=a._shuffleNextDict[b]||0;a._isLoaded(b)&&a._isLoaded(c)&&(a._goTo(c),++a._shufflePlayCount>=a.slides.$element.length&&(this._reshuffle(a),(!a.options.loop||a.options.playOnce)&&a.stop()))}else a._realNext()}}})(jQuery,WebPro,window,document);
(function(a,b,c){b.widget("Widget.Form",b.Widget,{_widgetName:"form",defaultOptions:{validationEvent:"blur",errorStateSensitivity:"low",ajaxSubmit:!0,fieldWrapperClass:"field",formErrorClass:"form-error",formSubmittedClass:"form-submitted",formDeliveredClass:"form-delivered",focusClass:"focus",notEmptyClass:"not-empty",emptyClass:"empty",validClass:"valid",invalidClass:"invalid",requiredClass:"required"},validationTypes:{"always-valid":/.*/,email:/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
alpha:/^[A-z\s]+$/,numeric:/^[0-9]+$/,phone:/^([0-9])?(\s)?(\([0-9]{3}\)|[0-9]{3}(\-)?)(\s)?[0-9]{3}(\s|\-)?[0-9]{4}(\s|\sext|\sx)?(\s)?[0-9]*$/,captcha:function(a){return a.data("captchaValid")},recaptcha:function(){if("undefined"==typeof Recaptcha)return!1;var a=Recaptcha.get_response();return a&&0<a.length},checkbox:function(){return!0},time:function(a){var a=a.find("input, textarea"),b=a.val().replace(/[^0-9:APM]/g,"");if(b.indexOf(":")!=-1&&b.match(/:/).length==1){var c=b.split(":"),k=parseInt(c[0]),
c=parseInt(c[1]);if(k<0||k>24)return!0;if(c<0||c>59)return!0}else return!1;a.val(b);return!0}},_transformMarkup:function(){var b=this;b.hasCAPTCHA=!1;b.hasReCAPTCHA=!1;this.$element.find("."+this.options.fieldWrapperClass).each(function(){var c=a(this);switch(c.attr("data-type")){case "captcha":b.hasCAPTCHA=!0;c.find('input[name="CaptchaV2"]').remove();c.find('input[name="muse_CaptchaV2"]').attr("name","CaptchaV2");break;case "recaptcha":b.hasReCAPTCHA=!0}})},_extractData:function(){this.event=this.options.validationEvent;
this.errorSensitivity=this.options.errorStateSensitivity;this.classNames={focus:this.options.focusClass,blur:this.options.emptyClass,keydown:this.options.notEmptyClass}},_attachBehavior:function(){var b=this;this.$element.find("input, textarea").each(function(){var c=a(this);c.val()!=""&&c.removeClass(b.options.emptyClass)});this.$element.find("."+this.options.fieldWrapperClass).each(function(){var c=a(this);c.attr("data-type")=="captcha"&&(c.data("captchaValid",!1),c.find('input[name="CaptchaV2"]').keyup(function(){var g=
a(this).val(),k=c.find('input[name="CaptchaHV2"]').val();b._validateCaptcha(k,g,function(a){c.data("captchaValid",a);c.data("error-state")&&b.errorSensitivity=="high"&&b._validate(c)})}));c.find("input, textarea").val()!=""&&c.addClass(b.classNames.keydown)});this.$element.find("input, textarea").bind("focus blur keydown change propertychange",function(c){var g=b.classNames[c.type],k=b.classNames.focus,h=b.classNames.keydown,l=b.classNames.blur,j=a(this),i=j.closest("."+b.options.fieldWrapperClass);
switch(c.type){case "focus":i.addClass(g).removeClass(l);break;case "blur":i.removeClass(k);j.val()==""&&i.addClass(g).removeClass(h);break;case "keydown":i.addClass(g).removeClass(l);break;case "change":case "propertychange":j.val()!=""?i.addClass(h).removeClass(l):i.addClass(l).removeClass(h)}});switch(this.event){case "blur":case "keyup":this.$element.find("."+this.options.fieldWrapperClass+" input, ."+this.options.fieldWrapperClass+" textarea").bind(this.event,function(){b._validate(a(this).closest("."+
b.options.fieldWrapperClass))});case "submit":this.$element.submit(function(c){var g=!0,k=b.$element.find("."+b.options.fieldWrapperClass).length-1;b.$element.find("."+b.options.fieldWrapperClass).each(function(h){if((g=b._validate(a(this))?g:!1)&&h==k&&b.options.ajaxSubmit)c.preventDefault(),b._submitForm();g||c.preventDefault()})})}},_validateCaptcha:function(b,c,g){c.length!=6?g(!1):a.get("/ValidateCaptcha.ashx",{key:b,answer:c},function(a){g(a=="true")})},_validateReCaptcha:function(b,c){a.get("/ValidateCaptcha.ashx",
{key:Recaptcha.get_challenge(),answer:Recaptcha.get_response(),imageVerificationType:"recaptcha"},function(a){a=="true"?b():c()})},_submitForm:function(){var b=this,c=a("#ReCaptchaAnswer",b.$element),g=a("#ReCaptchaChallenge",b.$element);b.hasReCAPTCHA&&1==c.length&&1==g.length?(c.val(Recaptcha.get_response()),g.val(Recaptcha.get_challenge()),b._validateReCaptcha(function(){b._submitFormInternal()},function(){a("."+b.options.fieldWrapperClass,b.$element).each(function(){var c=a(this);c.attr("data-type")==
"recaptcha"&&b._switchState("invalid",c)});Recaptcha.reload()})):b._submitFormInternal()},_submitFormInternal:function(){var b=this,f=this.options.formSubmittedClass,g=this.options.formDeliveredClass,k=this.options.formErrorClass,h=f+" "+g+" "+k,l=this.$element.find("input[type=submit], button");a.ajax({url:this.$element.attr("action"),type:"post",data:this.$element.serialize(),beforeSend:function(){b.$element.removeClass(h);b.$element.addClass(f);b.$element.find("."+b.options.fieldWrapperClass).removeClass(b.options.focusClass);
l.attr("disabled","disabled")},complete:function(h){h&&(h.status>=400||h.responseText&&h.responseText.indexOf("<?php")>=0)&&alert("Form PHP script is missing from web server, or PHP is not configured correctly on your web hosting provider. Check if the form PHP script has been uploaded correctly, then contact your hosting provider about PHP configuration.");b.$element.removeClass(f);var i=null;if(h&&h.responseText)try{i=jQuery.parseJSON(h.responseText),i=i.FormProcessV2Response||i.FormResponse||i.MusePHPFormResponse||
i}catch(n){}if(i&&i.success){b.$element.addClass(g);if(i.redirect){c.location.href=i.redirect;return}b.$element[0].reset();b.hasCAPTCHA&&b.$element.find("input:not([type=submit]), textarea").each(function(){a(this).attr("disabled","disabled")})}else if(h=b._getFieldsWithError(i))for(i=0;i<h.length;i++)b._switchState("invalid",h[i]);else b.$element.addClass(k);b.hasCAPTCHA||l.removeAttr("disabled");b.hasReCAPTCHA&&Recaptcha.reload()}})},_getFieldsWithError:function(b){if(!b||!b.error||!b.error.fields||
!b.error.fields.length)return null;for(var c=[],g=0;g<b.error.fields.length;g++){var k=a('[name="'+b.error.fields[g].field+'"]',this.$element).parents("."+this.options.fieldWrapperClass);1==k.length&&c.push(k)}return c},_validate:function(a){var b=a.attr("data-type")||"always-valid",c=a.find("input, textarea"),k=this.validationTypes[b],b=a.attr("data-required")==="true",h="checkbox"==c.attr("type")?typeof c.attr("checked")==="undefined":c.val()=="",c=k instanceof RegExp?Boolean(c.val().match(k)):
k(a);if(b&&h)return this._switchState("required",a);if(!c)return this._switchState("invalid",a);return this._switchState("valid",a)},_switchState:function(a,b){function c(){i._validate(b)}var k=b.attr("data-type"),h=this.options.validClass,l=this.options.invalidClass,j=this.options.requiredClass;b.removeClass(h+" "+l+" "+j);if(a=="required"||a=="invalid"){a=="invalid"?b.addClass(l):b.addClass(j);if("recaptcha"!=k&&this.errorSensitivity!="low"){var i=this,k=this.errorSensitivity=="high"?"keyup":"blur";
b.data("error-state")||(b.data("error-state",!0),b.find("input, textarea").bind(k,c))}return!1}b.data("error-state")&&(this.errorSensitivity=="high"?this.event!="keyup"&&b.data("error-state",!1).find("input, textarea").unbind("keyup",c):this.errorSensitivity=="medium"&&this.event!="blur"&&b.data("error-state",!1).find("input, textarea").unbind("blur",c));b.addClass(h);return!0}});a.fn.wpForm=function(a){new b.Widget.Form(this,a);return this}})(jQuery,WebPro,window,document);
;(function(){if(!("undefined"==typeof Muse||"undefined"==typeof Muse.assets)){var a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1}(Muse.assets.required,"webpro.js");if(-1!=a){Muse.assets.required.splice(a,1);for(var a=document.getElementsByTagName("meta"),b=0,c=a.length;b<c;b++){var d=a[b];if("generator"==d.getAttribute("name")){"2014.3.2.295"!=d.getAttribute("content")&&Muse.assets.outOfDate.push("webpro.js");break}}}}})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




// = webpro


