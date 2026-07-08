import Qe, { createContext as Ar, useState as be, useMemo as Or, useContext as qr, useEffect as we } from "react";
import Fr from "axios";
import { useQuery as Ee, useMutation as de } from "@tanstack/react-query";
import { useLocation as Dr, Outlet as Lr, Navigate as ce, NavLink as D, useParams as er, useNavigate as Se, Routes as Vr, Route as I } from "react-router-dom";
import { appendErrors as $r, useForm as se } from "react-hook-form";
import { validateFieldsNatively as Ir, toNestErrors as Yr } from "@hookform/resolvers";
import * as k from "yup";
import { Box as w, Typography as v, Alert as N, Stack as X, TextField as Y, Button as ne, CircularProgress as te } from "@mui/material";
import Nr from "jwt-decode";
var Re = { exports: {} }, ee = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var He;
function zr() {
  if (He) return ee;
  He = 1;
  var s = Qe, n = Symbol.for("react.element"), u = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, l = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(a, c, h) {
    var f, j = {}, E = null, S = null;
    h !== void 0 && (E = "" + h), c.key !== void 0 && (E = "" + c.key), c.ref !== void 0 && (S = c.ref);
    for (f in c) i.call(c, f) && !d.hasOwnProperty(f) && (j[f] = c[f]);
    if (a && a.defaultProps) for (f in c = a.defaultProps, c) j[f] === void 0 && (j[f] = c[f]);
    return { $$typeof: n, type: a, key: E, ref: S, props: j, _owner: l.current };
  }
  return ee.Fragment = u, ee.jsx = m, ee.jsxs = m, ee;
}
var re = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ze;
function Wr() {
  return Ze || (Ze = 1, process.env.NODE_ENV !== "production" && function() {
    var s = Qe, n = Symbol.for("react.element"), u = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), a = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), j = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), P = Symbol.iterator, O = "@@iterator";
    function L(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = P && e[P] || e[O];
      return typeof t == "function" ? t : null;
    }
    var q = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(e) {
      {
        for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), p = 1; p < t; p++)
          o[p - 1] = arguments[p];
        W("error", e, o);
      }
    }
    function W(e, t, o) {
      {
        var p = q.ReactDebugCurrentFrame, y = p.getStackAddendum();
        y !== "" && (t += "%s", o = o.concat([y]));
        var R = o.map(function(g) {
          return String(g);
        });
        R.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, R);
      }
    }
    var V = !1, C = !1, B = !1, ae = !1, H = !1, Pe;
    Pe = Symbol.for("react.module.reference");
    function tr(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === i || e === d || H || e === l || e === h || e === f || ae || e === S || V || C || B || typeof e == "object" && e !== null && (e.$$typeof === E || e.$$typeof === j || e.$$typeof === m || e.$$typeof === a || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Pe || e.getModuleId !== void 0));
    }
    function sr(e, t, o) {
      var p = e.displayName;
      if (p)
        return p;
      var y = t.displayName || t.name || "";
      return y !== "" ? o + "(" + y + ")" : o;
    }
    function Te(e) {
      return e.displayName || "Context";
    }
    function U(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case i:
          return "Fragment";
        case u:
          return "Portal";
        case d:
          return "Profiler";
        case l:
          return "StrictMode";
        case h:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case a:
            var t = e;
            return Te(t) + ".Consumer";
          case m:
            var o = e;
            return Te(o._context) + ".Provider";
          case c:
            return sr(e, e.render, "ForwardRef");
          case j:
            var p = e.displayName || null;
            return p !== null ? p : U(e.type) || "Memo";
          case E: {
            var y = e, R = y._payload, g = y._init;
            try {
              return U(g(R));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var M = Object.assign, Z = 0, _e, ke, Ce, Ae, Oe, qe, Fe;
    function De() {
    }
    De.__reactDisabledLog = !0;
    function nr() {
      {
        if (Z === 0) {
          _e = console.log, ke = console.info, Ce = console.warn, Ae = console.error, Oe = console.group, qe = console.groupCollapsed, Fe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: De,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Z++;
      }
    }
    function ar() {
      {
        if (Z--, Z === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: M({}, e, {
              value: _e
            }),
            info: M({}, e, {
              value: ke
            }),
            warn: M({}, e, {
              value: Ce
            }),
            error: M({}, e, {
              value: Ae
            }),
            group: M({}, e, {
              value: Oe
            }),
            groupCollapsed: M({}, e, {
              value: qe
            }),
            groupEnd: M({}, e, {
              value: Fe
            })
          });
        }
        Z < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var me = q.ReactCurrentDispatcher, pe;
    function ie(e, t, o) {
      {
        if (pe === void 0)
          try {
            throw Error();
          } catch (y) {
            var p = y.stack.trim().match(/\n( *(at )?)/);
            pe = p && p[1] || "";
          }
        return `
` + pe + e;
      }
    }
    var he = !1, oe;
    {
      var ir = typeof WeakMap == "function" ? WeakMap : Map;
      oe = new ir();
    }
    function Le(e, t) {
      if (!e || he)
        return "";
      {
        var o = oe.get(e);
        if (o !== void 0)
          return o;
      }
      var p;
      he = !0;
      var y = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var R;
      R = me.current, me.current = null, nr();
      try {
        if (t) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (F) {
              p = F;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (F) {
              p = F;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            p = F;
          }
          e();
        }
      } catch (F) {
        if (F && p && typeof F.stack == "string") {
          for (var x = F.stack.split(`
`), A = p.stack.split(`
`), T = x.length - 1, _ = A.length - 1; T >= 1 && _ >= 0 && x[T] !== A[_]; )
            _--;
          for (; T >= 1 && _ >= 0; T--, _--)
            if (x[T] !== A[_]) {
              if (T !== 1 || _ !== 1)
                do
                  if (T--, _--, _ < 0 || x[T] !== A[_]) {
                    var $ = `
` + x[T].replace(" at new ", " at ");
                    return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), typeof e == "function" && oe.set(e, $), $;
                  }
                while (T >= 1 && _ >= 0);
              break;
            }
        }
      } finally {
        he = !1, me.current = R, ar(), Error.prepareStackTrace = y;
      }
      var J = e ? e.displayName || e.name : "", K = J ? ie(J) : "";
      return typeof e == "function" && oe.set(e, K), K;
    }
    function or(e, t, o) {
      return Le(e, !1);
    }
    function ur(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function ue(e, t, o) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Le(e, ur(e));
      if (typeof e == "string")
        return ie(e);
      switch (e) {
        case h:
          return ie("Suspense");
        case f:
          return ie("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return or(e.render);
          case j:
            return ue(e.type, t, o);
          case E: {
            var p = e, y = p._payload, R = p._init;
            try {
              return ue(R(y), t, o);
            } catch {
            }
          }
        }
      return "";
    }
    var Q = Object.prototype.hasOwnProperty, Ve = {}, $e = q.ReactDebugCurrentFrame;
    function le(e) {
      if (e) {
        var t = e._owner, o = ue(e.type, e._source, t ? t.type : null);
        $e.setExtraStackFrame(o);
      } else
        $e.setExtraStackFrame(null);
    }
    function lr(e, t, o, p, y) {
      {
        var R = Function.call.bind(Q);
        for (var g in e)
          if (R(e, g)) {
            var x = void 0;
            try {
              if (typeof e[g] != "function") {
                var A = Error((p || "React class") + ": " + o + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw A.name = "Invariant Violation", A;
              }
              x = e[g](t, g, p, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              x = T;
            }
            x && !(x instanceof Error) && (le(y), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", p || "React class", o, g, typeof x), le(null)), x instanceof Error && !(x.message in Ve) && (Ve[x.message] = !0, le(y), b("Failed %s type: %s", o, x.message), le(null));
          }
      }
    }
    var cr = Array.isArray;
    function xe(e) {
      return cr(e);
    }
    function dr(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, o = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return o;
      }
    }
    function fr(e) {
      try {
        return Ie(e), !1;
      } catch {
        return !0;
      }
    }
    function Ie(e) {
      return "" + e;
    }
    function Ye(e) {
      if (fr(e))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", dr(e)), Ie(e);
    }
    var Ne = q.ReactCurrentOwner, mr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ze, We;
    function pr(e) {
      if (Q.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function hr(e) {
      if (Q.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function xr(e, t) {
      typeof e.ref == "string" && Ne.current;
    }
    function gr(e, t) {
      {
        var o = function() {
          ze || (ze = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
    }
    function vr(e, t) {
      {
        var o = function() {
          We || (We = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: o,
          configurable: !0
        });
      }
    }
    var yr = function(e, t, o, p, y, R, g) {
      var x = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: o,
        props: g,
        // Record the component responsible for creating this element.
        _owner: R
      };
      return x._store = {}, Object.defineProperty(x._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(x, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.defineProperty(x, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    };
    function jr(e, t, o, p, y) {
      {
        var R, g = {}, x = null, A = null;
        o !== void 0 && (Ye(o), x = "" + o), hr(t) && (Ye(t.key), x = "" + t.key), pr(t) && (A = t.ref, xr(t, y));
        for (R in t)
          Q.call(t, R) && !mr.hasOwnProperty(R) && (g[R] = t[R]);
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (R in T)
            g[R] === void 0 && (g[R] = T[R]);
        }
        if (x || A) {
          var _ = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          x && gr(g, _), A && vr(g, _);
        }
        return yr(e, x, A, y, p, Ne.current, g);
      }
    }
    var ge = q.ReactCurrentOwner, Be = q.ReactDebugCurrentFrame;
    function G(e) {
      if (e) {
        var t = e._owner, o = ue(e.type, e._source, t ? t.type : null);
        Be.setExtraStackFrame(o);
      } else
        Be.setExtraStackFrame(null);
    }
    var ve;
    ve = !1;
    function ye(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function Ue() {
      {
        if (ge.current) {
          var e = U(ge.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function br(e) {
      return "";
    }
    var Me = {};
    function wr(e) {
      {
        var t = Ue();
        if (!t) {
          var o = typeof e == "string" ? e : e.displayName || e.name;
          o && (t = `

Check the top-level render call using <` + o + ">.");
        }
        return t;
      }
    }
    function Ke(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var o = wr(t);
        if (Me[o])
          return;
        Me[o] = !0;
        var p = "";
        e && e._owner && e._owner !== ge.current && (p = " It was passed a child from " + U(e._owner.type) + "."), G(e), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, p), G(null);
      }
    }
    function Ge(e, t) {
      {
        if (typeof e != "object")
          return;
        if (xe(e))
          for (var o = 0; o < e.length; o++) {
            var p = e[o];
            ye(p) && Ke(p, t);
          }
        else if (ye(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var y = L(e);
          if (typeof y == "function" && y !== e.entries)
            for (var R = y.call(e), g; !(g = R.next()).done; )
              ye(g.value) && Ke(g.value, t);
        }
      }
    }
    function Rr(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var o;
        if (typeof t == "function")
          o = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === j))
          o = t.propTypes;
        else
          return;
        if (o) {
          var p = U(t);
          lr(o, e.props, "prop", p, e);
        } else if (t.PropTypes !== void 0 && !ve) {
          ve = !0;
          var y = U(t);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", y || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Er(e) {
      {
        for (var t = Object.keys(e.props), o = 0; o < t.length; o++) {
          var p = t[o];
          if (p !== "children" && p !== "key") {
            G(e), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", p), G(null);
            break;
          }
        }
        e.ref !== null && (G(e), b("Invalid attribute `ref` supplied to `React.Fragment`."), G(null));
      }
    }
    var Je = {};
    function Xe(e, t, o, p, y, R) {
      {
        var g = tr(e);
        if (!g) {
          var x = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var A = br();
          A ? x += A : x += Ue();
          var T;
          e === null ? T = "null" : xe(e) ? T = "array" : e !== void 0 && e.$$typeof === n ? (T = "<" + (U(e.type) || "Unknown") + " />", x = " Did you accidentally export a JSX literal instead of a component?") : T = typeof e, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, x);
        }
        var _ = jr(e, t, o, y, R);
        if (_ == null)
          return _;
        if (g) {
          var $ = t.children;
          if ($ !== void 0)
            if (p)
              if (xe($)) {
                for (var J = 0; J < $.length; J++)
                  Ge($[J], e);
                Object.freeze && Object.freeze($);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ge($, e);
        }
        if (Q.call(t, "key")) {
          var K = U(e), F = Object.keys(t).filter(function(Cr) {
            return Cr !== "key";
          }), je = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Je[K + je]) {
            var kr = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, je, K, kr, K), Je[K + je] = !0;
          }
        }
        return e === i ? Er(_) : Rr(_), _;
      }
    }
    function Sr(e, t, o) {
      return Xe(e, t, o, !0);
    }
    function Pr(e, t, o) {
      return Xe(e, t, o, !1);
    }
    var Tr = Pr, _r = Sr;
    re.Fragment = i, re.jsx = Tr, re.jsxs = _r;
  }()), re;
}
process.env.NODE_ENV === "production" ? Re.exports = zr() : Re.exports = Wr();
var r = Re.exports;
const rr = Ar({}), mt = ({ children: s, authBaseUrl: n }) => {
  const [u, i] = be({}), [l, d] = be(void 0), m = Or(() => Fr.create({
    baseURL: n,
    headers: { "Content-Type": "application/json" },
    withCredentials: !0
  }), [n]);
  return /* @__PURE__ */ r.jsx(rr.Provider, { value: { auth: u, setAuth: i, user: l, setUser: d, authBaseUrl: n, authAxios: m }, children: s });
}, z = () => {
  const s = qr(rr);
  if (!s)
    throw new Error("useAuth must be used within an AuthProvider");
  return s;
}, Br = (s, n = "refresh") => {
  const { setAuth: u, authAxios: i } = z(), l = s || i, d = () => l({ method: "GET", url: n }), { refetch: m } = Ee({
    queryKey: ["refresh"],
    queryFn: d,
    onSuccess: (a) => {
      u((c) => {
        var h;
        return { ...c, accessToken: (h = a == null ? void 0 : a.data) == null ? void 0 : h.accessToken };
      });
    },
    onError: (a) => {
      console.log("Refresh Failed", a);
    },
    enabled: !1,
    retry: !1
  });
  return m;
}, pt = (s, n = "refresh") => {
  const { auth: u, setAuth: i } = z(), l = Br(s, n);
  return we(() => {
    const d = s.interceptors.request.use(
      (a) => (a.headers.authorization || (a.headers.authorization = `Bearer ${u == null ? void 0 : u.accessToken}`), a),
      (a) => Promise.reject(a)
    ), m = s.interceptors.response.use(
      (a) => a,
      async (a) => {
        var h, f, j, E, S;
        const c = a == null ? void 0 : a.config;
        if ((f = (h = a == null ? void 0 : a.response) == null ? void 0 : h.data) != null && f.error && (a.message = `${a.response.data.error} (${a.response.status})`), c.url === n)
          return Promise.reject(a);
        if (((j = a == null ? void 0 : a.response) == null ? void 0 : j.status) === 403 && !(c != null && c.sent)) {
          c.sent = !0;
          try {
            const P = await l(), O = (S = (E = P == null ? void 0 : P.data) == null ? void 0 : E.data) == null ? void 0 : S.accessToken;
            return O ? (c.headers.authorization = `Bearer ${O}`, s(c)) : (i({ message: "Session expired. Please login again." }), Promise.reject(a));
          } catch (P) {
            return i({ message: "Session expired. Please login again." }), Promise.reject(P);
          }
        }
        return Promise.reject(a);
      }
    );
    return () => {
      s.interceptors.request.eject(d), s.interceptors.response.eject(m);
    };
  }, [u, l, s, n, i]), s;
}, ht = (s, n = "auth") => {
  const { authAxios: u } = z(), i = s || u;
  return de({
    mutationFn: (l) => i({
      url: n,
      method: "POST",
      data: l
    }),
    mutationKey: ["login"]
  });
}, xt = ({
  allowedPerms: s,
  unauthorizedPath: n = "/unauthorized",
  loginPath: u = "/"
}) => {
  var m;
  const { auth: i } = z(), l = Dr();
  return ((m = i == null ? void 0 : i.permissions) == null ? void 0 : m.some((a) => s == null ? void 0 : s.includes(a.perm_key))) ? /* @__PURE__ */ r.jsx(Lr, {}) : i != null && i.email ? /* @__PURE__ */ r.jsx(ce, { to: n, state: { from: l }, replace: !0 }) : /* @__PURE__ */ r.jsx(ce, { to: u, state: { from: l }, replace: !0 });
}, Ur = (s, n = "/register/submit") => {
  const { authAxios: u } = z(), i = s || u;
  return de({
    mutationFn: async ({ email: l, first: d, last: m, requestNote: a }) => (await i.post(n, {
      email: l,
      first: d,
      last: m,
      requestNote: a
    })).data
  });
};
function fe(s, n, u) {
  return n === void 0 && (n = {}), u === void 0 && (u = {}), function(i, l, d) {
    try {
      return Promise.resolve(function(m, a) {
        try {
          var c = (n.context && process.env.NODE_ENV === "development" && console.warn("You should not used the yup options context. Please, use the 'useForm' context object instead"), Promise.resolve(s[u.mode === "sync" ? "validateSync" : "validate"](i, Object.assign({ abortEarly: !1 }, n, { context: l }))).then(function(h) {
            return d.shouldUseNativeValidation && Ir({}, d), { values: u.raw ? i : h, errors: {} };
          }));
        } catch (h) {
          return a(h);
        }
        return c && c.then ? c.then(void 0, a) : c;
      }(0, function(m) {
        if (!m.inner) throw m;
        return { values: {}, errors: Yr((a = m, c = !d.shouldUseNativeValidation && d.criteriaMode === "all", (a.inner || []).reduce(function(h, f) {
          if (h[f.path] || (h[f.path] = { message: f.message, type: f.type }), c) {
            var j = h[f.path].types, E = j && j[f.type];
            h[f.path] = $r(f.path, c, h, f.type, E ? [].concat(E, f.message) : f.message);
          }
          return h;
        }, {})), d) };
        var a, c;
      }));
    } catch (m) {
      return Promise.reject(m);
    }
  };
}
const Mr = ({
  onSubmit: s,
  isLoading: n = !1,
  isSuccess: u = !1,
  successMessage: i = "If this email is not already registered, you will receive a verification email shortly.",
  error: l,
  loginPath: d = "/login"
}) => {
  var E, S, P, O, L, q;
  const m = k.object().shape({
    email: k.string().email("Invalid email").required("Email is required"),
    first: k.string().required("First name is required"),
    last: k.string().required("Last name is required"),
    requestNote: k.string().max(256, "Request note must be 256 characters or less")
  }), a = se({
    defaultValues: {
      email: "",
      first: "",
      last: "",
      requestNote: ""
    },
    resolver: fe(m)
  }), { handleSubmit: c, register: h, formState: { errors: f } } = a, j = (b) => {
    s && s(b);
  };
  return u ? /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Registration Submitted" }),
    /* @__PURE__ */ r.jsx(N, { severity: "success", sx: { mb: 2 }, children: i }),
    /* @__PURE__ */ r.jsx(v, { variant: "body1", paragraph: !0, children: "Please check your email for a verification link. The link will expire in 24 hours." }),
    /* @__PURE__ */ r.jsx(v, { variant: "body2", color: "text.secondary", children: "If you don't receive an email within a few minutes, check your spam folder." }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: d, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Request Access" }),
    /* @__PURE__ */ r.jsx(v, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Fill out this form to request access. An administrator will review your request after you verify your email." }),
    l && /* @__PURE__ */ r.jsx(N, { severity: "error", sx: { mb: 2 }, children: ((S = (E = l.response) == null ? void 0 : E.data) == null ? void 0 : S.error) || l.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: c(j), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...h("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!f.email,
          helperText: (P = f.email) == null ? void 0 : P.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...h("first"),
          label: "First Name",
          type: "text",
          placeholder: "Enter your first name",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!f.first,
          helperText: (O = f.first) == null ? void 0 : O.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...h("last"),
          label: "Last Name",
          type: "text",
          placeholder: "Enter your last name",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!f.last,
          helperText: (L = f.last) == null ? void 0 : L.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...h("requestNote"),
          label: "Request Note (Optional)",
          type: "text",
          placeholder: "Why do you need access?",
          margin: "normal",
          size: "small",
          multiline: !0,
          rows: 3,
          error: !!f.requestNote,
          helperText: ((q = f.requestNote) == null ? void 0 : q.message) || "Max 256 characters"
        }
      ),
      /* @__PURE__ */ r.jsx(
        ne,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: n,
          children: n ? /* @__PURE__ */ r.jsx(te, { size: 24 }) : "Submit Request"
        }
      )
    ] }) }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: d, children: "Already have an account? Login" }) })
  ] });
}, Kr = ({ loginPath: s = "/login" }) => {
  var i;
  const n = Ur(), u = (l) => {
    n.mutate(l);
  };
  return /* @__PURE__ */ r.jsx(
    Mr,
    {
      onSubmit: u,
      isLoading: n.isLoading || n.isPending,
      isSuccess: n.isSuccess,
      successMessage: (i = n.data) == null ? void 0 : i.message,
      error: n.error,
      loginPath: s
    }
  );
}, Gr = (s, n, u = "/register/verify") => {
  const { authAxios: i } = z(), l = s || i;
  return Ee({
    queryKey: ["emailVerification", n],
    queryFn: async () => {
      if (!n)
        throw new Error("No verification token provided");
      return (await l.get(`${u}/${n}`)).data;
    },
    enabled: !!n,
    retry: !1,
    refetchOnWindowFocus: !1
  });
}, Jr = ({
  isLoading: s = !1,
  isSuccess: n = !1,
  isError: u = !1,
  error: i,
  data: l,
  loginPath: d = "/login"
}) => {
  var m, a;
  if (s)
    return /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx(te, { size: 48, sx: { mb: 2 } }),
      /* @__PURE__ */ r.jsx(v, { variant: "h6", children: "Verifying your email..." })
    ] });
  if (u) {
    const c = ((a = (m = i == null ? void 0 : i.response) == null ? void 0 : m.data) == null ? void 0 : a.error) || (i == null ? void 0 : i.message) || "Verification failed";
    return /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
      /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Verification Failed" }),
      /* @__PURE__ */ r.jsx(N, { severity: "error", sx: { mb: 2 }, children: c }),
      /* @__PURE__ */ r.jsx(v, { variant: "body1", paragraph: !0, children: "The verification link may have expired or already been used." }),
      /* @__PURE__ */ r.jsx(v, { variant: "body2", color: "text.secondary", children: "If you need a new verification link, please submit a new registration request." }),
      /* @__PURE__ */ r.jsxs(w, { sx: { mt: 3 }, children: [
        /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: "/register", children: "Submit New Request" }),
        /* @__PURE__ */ r.jsx(w, { component: "span", sx: { mx: 2 }, children: "|" }),
        /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: d, children: "Return to Login" })
      ] })
    ] });
  }
  return n ? /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Email Verified" }),
    /* @__PURE__ */ r.jsx(N, { severity: "success", sx: { mb: 2 }, children: (l == null ? void 0 : l.message) || "Your email has been verified successfully." }),
    /* @__PURE__ */ r.jsx(v, { variant: "body1", paragraph: !0, children: "Your request is now pending administrator review." }),
    /* @__PURE__ */ r.jsx(v, { variant: "body2", color: "text.secondary", children: "You will receive an email when your request has been reviewed. This typically takes 1-2 business days." }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: d, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsx(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: /* @__PURE__ */ r.jsx(v, { variant: "h6", children: "Processing verification..." }) });
}, Xr = ({ loginPath: s = "/login" }) => {
  const { token: n } = er(), { isLoading: u, isPending: i, isSuccess: l, isError: d, error: m, data: a } = Gr(void 0, n);
  return /* @__PURE__ */ r.jsx(
    Jr,
    {
      isLoading: u || i,
      isSuccess: l,
      isError: d,
      error: m,
      data: a,
      loginPath: s
    }
  );
}, Hr = (s, n, u = "/register/setup") => {
  const { authAxios: i } = z(), l = s || i;
  return Ee({
    queryKey: ["validateSetupToken", n],
    queryFn: async () => {
      if (!n)
        throw new Error("No setup token provided");
      return (await l.get(`${u}/${n}`)).data;
    },
    enabled: !!n,
    retry: !1,
    refetchOnWindowFocus: !1
  });
}, Zr = (s, n = "/register/setup") => {
  const { authAxios: u } = z(), i = s || u;
  return de({
    mutationFn: async ({ token: l, password: d }) => (await i.post(`${n}/${l}`, { password: d })).data
  });
}, Qr = (s, n = "/register/forgot-password") => {
  const { authAxios: u } = z(), i = s || u;
  return de({
    mutationFn: async ({ email: l }) => (await i.post(n, { email: l })).data
  });
}, et = (s, n, u = "/register/setup") => {
  var d, m, a;
  const i = Hr(s, n, u), l = Zr(s, u);
  return {
    validation: i,
    setPassword: l,
    isValidToken: i.isSuccess && ((d = i.data) == null ? void 0 : d.valid),
    userEmail: (m = i.data) == null ? void 0 : m.email,
    userFirst: (a = i.data) == null ? void 0 : a.first
  };
}, rt = ({
  isValidating: s = !1,
  isValidToken: n = !1,
  validationError: u,
  userEmail: i,
  userFirst: l,
  onSubmit: d,
  isSubmitting: m = !1,
  isSuccess: a = !1,
  submitError: c,
  loginPath: h = "/login",
  passwordRegex: f = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  passwordMessage: j = "8-24 characters, must include uppercase and lowercase letters, a number and a special character (!@#$%)"
}) => {
  var b, W, V, C, B, ae;
  const E = k.object().shape({
    password: k.string().matches(f, j).required("Password is required"),
    confirmPassword: k.string().oneOf([k.ref("password"), null], "Passwords must match").required("Please confirm your password")
  }), S = se({
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
    resolver: fe(E)
  }), { handleSubmit: P, register: O, formState: { errors: L } } = S, q = (H) => {
    d && d({ password: H.password });
  };
  if (s)
    return /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx(te, { size: 48, sx: { mb: 2 } }),
      /* @__PURE__ */ r.jsx(v, { variant: "h6", children: "Validating your link..." })
    ] });
  if (!n && !s) {
    const H = ((W = (b = u == null ? void 0 : u.response) == null ? void 0 : b.data) == null ? void 0 : W.error) || (u == null ? void 0 : u.message) || "Invalid or expired link";
    return /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
      /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Invalid Link" }),
      /* @__PURE__ */ r.jsx(N, { severity: "error", sx: { mb: 2 }, children: H }),
      /* @__PURE__ */ r.jsx(v, { variant: "body1", paragraph: !0, children: "This password setup link is invalid or has expired." }),
      /* @__PURE__ */ r.jsx(v, { variant: "body2", color: "text.secondary", children: "If you believe this is an error, please contact an administrator." }),
      /* @__PURE__ */ r.jsx(w, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: h, children: "Return to Login" }) })
    ] });
  }
  return a ? /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Password Set Successfully" }),
    /* @__PURE__ */ r.jsx(N, { severity: "success", sx: { mb: 2 }, children: "Your password has been set. You can now log in to your account." }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: h, children: "Go to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Set Your Password" }),
    l && /* @__PURE__ */ r.jsxs(v, { variant: "body1", sx: { mb: 1 }, children: [
      "Welcome, ",
      l,
      "!"
    ] }),
    i && /* @__PURE__ */ r.jsxs(v, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: [
      "Setting password for: ",
      i
    ] }),
    c && /* @__PURE__ */ r.jsx(N, { severity: "error", sx: { mb: 2 }, children: ((C = (V = c.response) == null ? void 0 : V.data) == null ? void 0 : C.error) || c.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: P(q), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...O("password"),
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!L.password,
          helperText: (B = L.password) == null ? void 0 : B.message
        }
      ),
      /* @__PURE__ */ r.jsx(v, { variant: "caption", color: "text.secondary", children: j }),
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...O("confirmPassword"),
          label: "Confirm Password",
          type: "password",
          placeholder: "Re-enter your password",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!L.confirmPassword,
          helperText: (ae = L.confirmPassword) == null ? void 0 : ae.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        ne,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: m,
          children: m ? /* @__PURE__ */ r.jsx(te, { size: 24 }) : "Set Password"
        }
      )
    ] }) })
  ] });
}, tt = ({ loginPath: s = "/login" }) => {
  const { token: n } = er(), u = Se(), { validation: i, setPassword: l, isValidToken: d, userEmail: m, userFirst: a } = et(void 0, n), c = ({ password: h }) => {
    l.mutate(
      { token: n, password: h },
      {
        onSuccess: () => {
          setTimeout(() => u(s), 2e3);
        }
      }
    );
  };
  return /* @__PURE__ */ r.jsx(
    rt,
    {
      isValidating: i.isLoading || i.isPending,
      isValidToken: d,
      validationError: i.error,
      userEmail: m,
      userFirst: a,
      onSubmit: c,
      isSubmitting: l.isLoading || l.isPending,
      isSuccess: l.isSuccess,
      submitError: l.error,
      loginPath: s
    }
  );
}, st = ({
  onSubmit: s,
  isLoading: n = !1,
  isSuccess: u = !1,
  successMessage: i = "If an account exists for this email, you will receive a password reset link shortly.",
  error: l,
  loginPath: d = "/login"
}) => {
  var E, S, P;
  const m = k.object().shape({
    email: k.string().email("Invalid email").required("Email is required")
  }), a = se({
    defaultValues: {
      email: ""
    },
    resolver: fe(m)
  }), { handleSubmit: c, register: h, formState: { errors: f } } = a, j = (O) => {
    s && s(O);
  };
  return u ? /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Reset Link Sent" }),
    /* @__PURE__ */ r.jsx(N, { severity: "success", sx: { mb: 2 }, children: i }),
    /* @__PURE__ */ r.jsx(v, { variant: "body1", paragraph: !0, children: "Please check your email for a link to reset your password." }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: d, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: "Reset Password" }),
    /* @__PURE__ */ r.jsx(v, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Enter your email address below and we'll send you a link to reset your password." }),
    l && /* @__PURE__ */ r.jsx(N, { severity: "error", sx: { mb: 2 }, children: ((S = (E = l.response) == null ? void 0 : E.data) == null ? void 0 : S.error) || l.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: c(j), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...h("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!f.email,
          helperText: (P = f.email) == null ? void 0 : P.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        ne,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: n,
          children: n ? /* @__PURE__ */ r.jsx(te, { size: 24 }) : "Send Reset Link"
        }
      )
    ] }) }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: d, children: "Back to Login" }) })
  ] });
}, nt = ({ loginPath: s = "/login" }) => {
  const n = Qr(), u = (i) => {
    n.mutate(i);
  };
  return /* @__PURE__ */ r.jsx(
    st,
    {
      onSubmit: u,
      isLoading: n.isLoading || n.isPending,
      isSuccess: n.isSuccess,
      error: n.error,
      loginPath: s
    }
  );
}, gt = ({
  LoginComponent: s,
  RegisterComponent: n,
  UnauthorizedComponent: u,
  LayoutComponent: i = ({ children: a }) => /* @__PURE__ */ r.jsx(r.Fragment, { children: a }),
  postLoginRedirect: l = "/",
  children: d,
  publicRoutes: m = []
}) => {
  const { auth: a } = z(), c = !!a.email, h = n || Kr;
  return /* @__PURE__ */ r.jsxs(Vr, { children: [
    m.map(({ path: f, element: j }) => /* @__PURE__ */ r.jsx(I, { element: /* @__PURE__ */ r.jsx(i, {}), children: /* @__PURE__ */ r.jsx(I, { path: f, element: j }) }, f)),
    c ? /* @__PURE__ */ r.jsxs(I, { element: /* @__PURE__ */ r.jsx(i, {}), children: [
      d,
      /* @__PURE__ */ r.jsx(I, { path: "/unauthorized", element: /* @__PURE__ */ r.jsx(u, {}) }),
      /* @__PURE__ */ r.jsx(I, { path: "*", element: /* @__PURE__ */ r.jsx(ce, { to: l, replace: !0 }) })
    ] }) : /* @__PURE__ */ r.jsxs(I, { element: /* @__PURE__ */ r.jsx(i, {}), children: [
      /* @__PURE__ */ r.jsx(I, { path: "/login", element: /* @__PURE__ */ r.jsx(s, { successRoute: l }) }),
      /* @__PURE__ */ r.jsx(I, { path: "/register", element: /* @__PURE__ */ r.jsx(h, {}) }),
      /* @__PURE__ */ r.jsx(I, { path: "/register/verify/:token", element: /* @__PURE__ */ r.jsx(Xr, {}) }),
      /* @__PURE__ */ r.jsx(I, { path: "/register/setup/:token", element: /* @__PURE__ */ r.jsx(tt, {}) }),
      /* @__PURE__ */ r.jsx(I, { path: "/forgot-password", element: /* @__PURE__ */ r.jsx(nt, {}) }),
      /* @__PURE__ */ r.jsx(I, { path: "*", element: /* @__PURE__ */ r.jsx(ce, { to: "/login", replace: !0 }) })
    ] })
  ] });
}, vt = ({
  loginMutation: s,
  // result of useLogin hook
  successRoute: n = "/",
  registerPath: u = "/register",
  resetPath: i = "/forgot-password",
  allowStay: l = !1,
  onLoginSuccess: d
}) => {
  var L, q;
  const [m, a] = be(""), { auth: c, setAuth: h } = z(), f = Se(), j = se({
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: !1
    }
  }), { handleSubmit: E, register: S, formState: { errors: P } } = j, O = (b) => {
    a(""), s.mutate(b);
  };
  return we(() => {
    var b, W;
    if (s.isSuccess) {
      a("");
      try {
        const V = (W = (b = s.data) == null ? void 0 : b.data) == null ? void 0 : W.accessToken, C = Nr(V);
        if (C.status !== "ACTIVE") {
          a("Successful login... but user is not Active. See system administrator");
          return;
        }
        const B = {
          userId: C.userId,
          email: C.email,
          first: C.first,
          last: C.last,
          status: C.status,
          permissions: C.permissions,
          accessToken: V
        };
        h(B), d && d(B), f(n);
      } catch (V) {
        console.error("Token decoding error:", V), a("Error processing login response");
      }
    }
  }, [s.isSuccess, s.data, f, h, n, d]), we(() => {
    var b, W, V, C;
    if (s.isError) {
      const B = ((V = (W = (b = s.error) == null ? void 0 : b.response) == null ? void 0 : W.data) == null ? void 0 : V.error) || ((C = s.error) == null ? void 0 : C.message);
      a(B);
    }
  }, [s.isError, s.error]), /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "33%" }, margin: "auto", padding: "20px" }, children: [
    s.isLoading && /* @__PURE__ */ r.jsx(N, { severity: "info", children: "Logging on to system..." }),
    m && /* @__PURE__ */ r.jsx(N, { severity: "error", children: m }),
    /* @__PURE__ */ r.jsx(v, { variant: "h5", children: "Login" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: E(O), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...S("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          margin: "normal",
          size: "small",
          error: !!P.email,
          helperText: (L = P.email) == null ? void 0 : L.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...S("password"),
          label: "Password",
          type: "password",
          placeholder: "Enter password",
          margin: "normal",
          size: "small",
          error: !!P.password,
          helperText: (q = P.password) == null ? void 0 : q.message
        }
      ),
      /* @__PURE__ */ r.jsx(w, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: i, children: "Reset Password" }) }),
      /* @__PURE__ */ r.jsx(ne, { sx: { margin: "10px" }, variant: "outlined", type: "submit", children: "Submit" })
    ] }) }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: u, children: "Register to Login" }) })
  ] });
}, yt = ({
  onSubmit: s,
  loginPath: n = "/login"
}) => {
  var f, j, E;
  Se();
  const u = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, l = k.object().shape({
    email: k.string().email("Invalid email").required("Required"),
    password: k.string().matches(u, "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character").required("Required"),
    confirmPwd: k.string().oneOf([k.ref("password"), null], "Passwords must match").required("Required")
  }), d = se({
    defaultValues: {
      email: "",
      password: "",
      confirmPwd: ""
    },
    resolver: fe(l)
  }), { handleSubmit: m, register: a, formState: { errors: c } } = d, h = (S) => {
    s ? s(S) : console.log("Registration submitted:", S);
  };
  return /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "33%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(v, { variant: "h5", children: "Register" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: m(h), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...a("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          margin: "normal",
          size: "small",
          error: !!c.email,
          helperText: (f = c.email) == null ? void 0 : f.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...a("password"),
          label: "Password",
          type: "password",
          placeholder: "Enter password",
          margin: "normal",
          size: "small",
          error: !!c.password,
          helperText: (j = c.password) == null ? void 0 : j.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        Y,
        {
          ...a("confirmPwd"),
          label: "Confirm Password",
          type: "password",
          placeholder: "Re-enter Password",
          margin: "normal",
          size: "small",
          error: !!c.confirmPwd,
          helperText: (E = c.confirmPwd) == null ? void 0 : E.message
        }
      ),
      /* @__PURE__ */ r.jsx(ne, { sx: { margin: "10px" }, variant: "outlined", type: "submit", children: "Submit" })
    ] }) }),
    /* @__PURE__ */ r.jsx(w, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: n, children: "Login if already a user" }) })
  ] });
}, jt = () => /* @__PURE__ */ r.jsxs(
  X,
  {
    sx: {
      margin: "10vh",
      alignItems: "center"
    },
    children: [
      /* @__PURE__ */ r.jsx(v, { variant: "h4", children: "You are not authorized to access this page." }),
      /* @__PURE__ */ r.jsx("br", {}),
      /* @__PURE__ */ r.jsx("br", {}),
      /* @__PURE__ */ r.jsx(v, { variant: "h5", children: "Contact your system administrator for access rights." })
    ]
  }
), bt = ({
  title: s = "Registration Complete",
  message: n = "Your account is now active. You can log in with your credentials.",
  loginPath: u = "/login"
}) => /* @__PURE__ */ r.jsxs(w, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
  /* @__PURE__ */ r.jsx(v, { variant: "h5", gutterBottom: !0, children: s }),
  /* @__PURE__ */ r.jsx(N, { severity: "success", sx: { mb: 2 }, children: n }),
  /* @__PURE__ */ r.jsx(w, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: u, children: "Go to Login" }) })
] });
export {
  rr as AuthContext,
  mt as AuthProvider,
  Jr as EmailVerification,
  vt as Login,
  st as PasswordResetRequest,
  rt as PasswordSetup,
  yt as Register,
  Mr as RegistrationRequest,
  bt as RegistrationSuccess,
  xt as RequireAuth,
  Xr as SmartEmailVerification,
  nt as SmartPasswordResetRequest,
  tt as SmartPasswordSetup,
  Kr as SmartRegistrationRequest,
  gt as StandardAuthRoutes,
  jt as Unauthorized,
  z as useAuth,
  Gr as useEmailVerification,
  ht as useLogin,
  et as usePasswordSetup,
  Br as useRefreshToken,
  Ur as useRegistrationSubmit,
  Qr as useRequestPasswordReset,
  pt as useSecureAxios,
  Zr as useSetPassword,
  Hr as useValidateSetupToken
};
