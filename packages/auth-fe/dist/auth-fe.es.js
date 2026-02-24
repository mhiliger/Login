import Ze, { createContext as Cr, useState as be, useMemo as Or, useContext as Ar, useEffect as we } from "react";
import qr from "axios";
import { useQuery as Ee, useMutation as de } from "@tanstack/react-query";
import { useLocation as Fr, Outlet as Dr, Navigate as ce, Routes as Vr, Route as B, useNavigate as Qe, NavLink as D } from "react-router-dom";
import { useForm as se, appendErrors as $r } from "react-hook-form";
import Ir from "jwt-decode";
import { Box as b, Alert as Y, Typography as g, Stack as X, TextField as L, Button as ne, CircularProgress as te } from "@mui/material";
import { validateFieldsNatively as Lr, toNestErrors as Yr } from "@hookform/resolvers";
import * as k from "yup";
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
var Xe;
function Nr() {
  if (Xe) return ee;
  Xe = 1;
  var n = Ze, o = Symbol.for("react.element"), l = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, c = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(s, u, p) {
    var d, w = {}, E = null, S = null;
    p !== void 0 && (E = "" + p), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (S = u.ref);
    for (d in u) i.call(u, d) && !f.hasOwnProperty(d) && (w[d] = u[d]);
    if (s && s.defaultProps) for (d in u = s.defaultProps, u) w[d] === void 0 && (w[d] = u[d]);
    return { $$typeof: o, type: s, key: E, ref: S, props: w, _owner: c.current };
  }
  return ee.Fragment = l, ee.jsx = h, ee.jsxs = h, ee;
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
var He;
function zr() {
  return He || (He = 1, process.env.NODE_ENV !== "production" && function() {
    var n = Ze, o = Symbol.for("react.element"), l = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), _ = Symbol.iterator, A = "@@iterator";
    function V(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = _ && e[_] || e[A];
      return typeof t == "function" ? t : null;
    }
    var q = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(e) {
      {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), m = 1; m < t; m++)
          a[m - 1] = arguments[m];
        z("error", e, a);
      }
    }
    function z(e, t, a) {
      {
        var m = q.ReactDebugCurrentFrame, y = m.getStackAddendum();
        y !== "" && (t += "%s", a = a.concat([y]));
        var R = a.map(function(v) {
          return String(v);
        });
        R.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, R);
      }
    }
    var $ = !1, C = !1, W = !1, ae = !1, H = !1, Se;
    Se = Symbol.for("react.module.reference");
    function rr(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === i || e === f || H || e === c || e === p || e === d || ae || e === S || $ || C || W || typeof e == "object" && e !== null && (e.$$typeof === E || e.$$typeof === w || e.$$typeof === h || e.$$typeof === s || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Se || e.getModuleId !== void 0));
    }
    function tr(e, t, a) {
      var m = e.displayName;
      if (m)
        return m;
      var y = t.displayName || t.name || "";
      return y !== "" ? a + "(" + y + ")" : a;
    }
    function _e(e) {
      return e.displayName || "Context";
    }
    function U(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case i:
          return "Fragment";
        case l:
          return "Portal";
        case f:
          return "Profiler";
        case c:
          return "StrictMode";
        case p:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case s:
            var t = e;
            return _e(t) + ".Consumer";
          case h:
            var a = e;
            return _e(a._context) + ".Provider";
          case u:
            return tr(e, e.render, "ForwardRef");
          case w:
            var m = e.displayName || null;
            return m !== null ? m : U(e.type) || "Memo";
          case E: {
            var y = e, R = y._payload, v = y._init;
            try {
              return U(v(R));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var K = Object.assign, Z = 0, Te, Pe, ke, Ce, Oe, Ae, qe;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function sr() {
      {
        if (Z === 0) {
          Te = console.log, Pe = console.info, ke = console.warn, Ce = console.error, Oe = console.group, Ae = console.groupCollapsed, qe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Fe,
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
    function nr() {
      {
        if (Z--, Z === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: K({}, e, {
              value: Te
            }),
            info: K({}, e, {
              value: Pe
            }),
            warn: K({}, e, {
              value: ke
            }),
            error: K({}, e, {
              value: Ce
            }),
            group: K({}, e, {
              value: Oe
            }),
            groupCollapsed: K({}, e, {
              value: Ae
            }),
            groupEnd: K({}, e, {
              value: qe
            })
          });
        }
        Z < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var me = q.ReactCurrentDispatcher, he;
    function ie(e, t, a) {
      {
        if (he === void 0)
          try {
            throw Error();
          } catch (y) {
            var m = y.stack.trim().match(/\n( *(at )?)/);
            he = m && m[1] || "";
          }
        return `
` + he + e;
      }
    }
    var pe = !1, oe;
    {
      var ar = typeof WeakMap == "function" ? WeakMap : Map;
      oe = new ar();
    }
    function De(e, t) {
      if (!e || pe)
        return "";
      {
        var a = oe.get(e);
        if (a !== void 0)
          return a;
      }
      var m;
      pe = !0;
      var y = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var R;
      R = me.current, me.current = null, sr();
      try {
        if (t) {
          var v = function() {
            throw Error();
          };
          if (Object.defineProperty(v.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(v, []);
            } catch (F) {
              m = F;
            }
            Reflect.construct(e, [], v);
          } else {
            try {
              v.call();
            } catch (F) {
              m = F;
            }
            e.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            m = F;
          }
          e();
        }
      } catch (F) {
        if (F && m && typeof F.stack == "string") {
          for (var x = F.stack.split(`
`), O = m.stack.split(`
`), T = x.length - 1, P = O.length - 1; T >= 1 && P >= 0 && x[T] !== O[P]; )
            P--;
          for (; T >= 1 && P >= 0; T--, P--)
            if (x[T] !== O[P]) {
              if (T !== 1 || P !== 1)
                do
                  if (T--, P--, P < 0 || x[T] !== O[P]) {
                    var I = `
` + x[T].replace(" at new ", " at ");
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && oe.set(e, I), I;
                  }
                while (T >= 1 && P >= 0);
              break;
            }
        }
      } finally {
        pe = !1, me.current = R, nr(), Error.prepareStackTrace = y;
      }
      var J = e ? e.displayName || e.name : "", M = J ? ie(J) : "";
      return typeof e == "function" && oe.set(e, M), M;
    }
    function ir(e, t, a) {
      return De(e, !1);
    }
    function or(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function le(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return De(e, or(e));
      if (typeof e == "string")
        return ie(e);
      switch (e) {
        case p:
          return ie("Suspense");
        case d:
          return ie("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return ir(e.render);
          case w:
            return le(e.type, t, a);
          case E: {
            var m = e, y = m._payload, R = m._init;
            try {
              return le(R(y), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    var Q = Object.prototype.hasOwnProperty, Ve = {}, $e = q.ReactDebugCurrentFrame;
    function ue(e) {
      if (e) {
        var t = e._owner, a = le(e.type, e._source, t ? t.type : null);
        $e.setExtraStackFrame(a);
      } else
        $e.setExtraStackFrame(null);
    }
    function lr(e, t, a, m, y) {
      {
        var R = Function.call.bind(Q);
        for (var v in e)
          if (R(e, v)) {
            var x = void 0;
            try {
              if (typeof e[v] != "function") {
                var O = Error((m || "React class") + ": " + a + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              x = e[v](t, v, m, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              x = T;
            }
            x && !(x instanceof Error) && (ue(y), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", m || "React class", a, v, typeof x), ue(null)), x instanceof Error && !(x.message in Ve) && (Ve[x.message] = !0, ue(y), j("Failed %s type: %s", a, x.message), ue(null));
          }
      }
    }
    var ur = Array.isArray;
    function xe(e) {
      return ur(e);
    }
    function cr(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function dr(e) {
      try {
        return Ie(e), !1;
      } catch {
        return !0;
      }
    }
    function Ie(e) {
      return "" + e;
    }
    function Le(e) {
      if (dr(e))
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", cr(e)), Ie(e);
    }
    var Ye = q.ReactCurrentOwner, fr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ne, ze;
    function mr(e) {
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
    function pr(e, t) {
      typeof e.ref == "string" && Ye.current;
    }
    function xr(e, t) {
      {
        var a = function() {
          Ne || (Ne = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function vr(e, t) {
      {
        var a = function() {
          ze || (ze = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        a.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var gr = function(e, t, a, m, y, R, v) {
      var x = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: o,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: a,
        props: v,
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
        value: m
      }), Object.defineProperty(x, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    };
    function yr(e, t, a, m, y) {
      {
        var R, v = {}, x = null, O = null;
        a !== void 0 && (Le(a), x = "" + a), hr(t) && (Le(t.key), x = "" + t.key), mr(t) && (O = t.ref, pr(t, y));
        for (R in t)
          Q.call(t, R) && !fr.hasOwnProperty(R) && (v[R] = t[R]);
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (R in T)
            v[R] === void 0 && (v[R] = T[R]);
        }
        if (x || O) {
          var P = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          x && xr(v, P), O && vr(v, P);
        }
        return gr(e, x, O, y, m, Ye.current, v);
      }
    }
    var ve = q.ReactCurrentOwner, We = q.ReactDebugCurrentFrame;
    function G(e) {
      if (e) {
        var t = e._owner, a = le(e.type, e._source, t ? t.type : null);
        We.setExtraStackFrame(a);
      } else
        We.setExtraStackFrame(null);
    }
    var ge;
    ge = !1;
    function ye(e) {
      return typeof e == "object" && e !== null && e.$$typeof === o;
    }
    function Be() {
      {
        if (ve.current) {
          var e = U(ve.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function jr(e) {
      return "";
    }
    var Ue = {};
    function br(e) {
      {
        var t = Be();
        if (!t) {
          var a = typeof e == "string" ? e : e.displayName || e.name;
          a && (t = `

Check the top-level render call using <` + a + ">.");
        }
        return t;
      }
    }
    function Ke(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var a = br(t);
        if (Ue[a])
          return;
        Ue[a] = !0;
        var m = "";
        e && e._owner && e._owner !== ve.current && (m = " It was passed a child from " + U(e._owner.type) + "."), G(e), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, m), G(null);
      }
    }
    function Me(e, t) {
      {
        if (typeof e != "object")
          return;
        if (xe(e))
          for (var a = 0; a < e.length; a++) {
            var m = e[a];
            ye(m) && Ke(m, t);
          }
        else if (ye(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var y = V(e);
          if (typeof y == "function" && y !== e.entries)
            for (var R = y.call(e), v; !(v = R.next()).done; )
              ye(v.value) && Ke(v.value, t);
        }
      }
    }
    function wr(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var a;
        if (typeof t == "function")
          a = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === w))
          a = t.propTypes;
        else
          return;
        if (a) {
          var m = U(t);
          lr(a, e.props, "prop", m, e);
        } else if (t.PropTypes !== void 0 && !ge) {
          ge = !0;
          var y = U(t);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", y || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rr(e) {
      {
        for (var t = Object.keys(e.props), a = 0; a < t.length; a++) {
          var m = t[a];
          if (m !== "children" && m !== "key") {
            G(e), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", m), G(null);
            break;
          }
        }
        e.ref !== null && (G(e), j("Invalid attribute `ref` supplied to `React.Fragment`."), G(null));
      }
    }
    var Ge = {};
    function Je(e, t, a, m, y, R) {
      {
        var v = rr(e);
        if (!v) {
          var x = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = jr();
          O ? x += O : x += Be();
          var T;
          e === null ? T = "null" : xe(e) ? T = "array" : e !== void 0 && e.$$typeof === o ? (T = "<" + (U(e.type) || "Unknown") + " />", x = " Did you accidentally export a JSX literal instead of a component?") : T = typeof e, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, x);
        }
        var P = yr(e, t, a, y, R);
        if (P == null)
          return P;
        if (v) {
          var I = t.children;
          if (I !== void 0)
            if (m)
              if (xe(I)) {
                for (var J = 0; J < I.length; J++)
                  Me(I[J], e);
                Object.freeze && Object.freeze(I);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Me(I, e);
        }
        if (Q.call(t, "key")) {
          var M = U(e), F = Object.keys(t).filter(function(kr) {
            return kr !== "key";
          }), je = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ge[M + je]) {
            var Pr = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            j(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, je, M, Pr, M), Ge[M + je] = !0;
          }
        }
        return e === i ? Rr(P) : wr(P), P;
      }
    }
    function Er(e, t, a) {
      return Je(e, t, a, !0);
    }
    function Sr(e, t, a) {
      return Je(e, t, a, !1);
    }
    var _r = Sr, Tr = Er;
    re.Fragment = i, re.jsx = _r, re.jsxs = Tr;
  }()), re;
}
process.env.NODE_ENV === "production" ? Re.exports = Nr() : Re.exports = zr();
var r = Re.exports;
const er = Cr({}), et = ({ children: n, authBaseUrl: o }) => {
  const [l, i] = be({}), [c, f] = be(void 0), h = Or(() => qr.create({
    baseURL: o,
    headers: { "Content-Type": "application/json" },
    withCredentials: !0
  }), [o]);
  return /* @__PURE__ */ r.jsx(er.Provider, { value: { auth: l, setAuth: i, user: c, setUser: f, authBaseUrl: o, authAxios: h }, children: n });
}, N = () => {
  const n = Ar(er);
  if (!n)
    throw new Error("useAuth must be used within an AuthProvider");
  return n;
}, Wr = (n, o = "refresh") => {
  const { setAuth: l, authAxios: i } = N(), c = n || i, f = () => c({ method: "GET", url: o }), { refetch: h } = Ee({
    queryKey: ["refresh"],
    queryFn: f,
    onSuccess: (s) => {
      l((u) => {
        var p;
        return { ...u, accessToken: (p = s == null ? void 0 : s.data) == null ? void 0 : p.accessToken };
      });
    },
    onError: (s) => {
      console.log("Refresh Failed", s);
    },
    enabled: !1,
    retry: !1
  });
  return h;
}, rt = (n, o = "refresh") => {
  const { auth: l, setAuth: i } = N(), c = Wr(n, o);
  return we(() => {
    const f = n.interceptors.request.use(
      (s) => (s.headers.authorization || (s.headers.authorization = `Bearer ${l == null ? void 0 : l.accessToken}`), s),
      (s) => Promise.reject(s)
    ), h = n.interceptors.response.use(
      (s) => s,
      async (s) => {
        var p, d, w, E, S;
        const u = s == null ? void 0 : s.config;
        if ((d = (p = s == null ? void 0 : s.response) == null ? void 0 : p.data) != null && d.error && (s.message = `${s.response.data.error} (${s.response.status})`), u.url === o)
          return Promise.reject(s);
        if (((w = s == null ? void 0 : s.response) == null ? void 0 : w.status) === 403 && !(u != null && u.sent)) {
          u.sent = !0;
          try {
            const _ = await c(), A = (S = (E = _ == null ? void 0 : _.data) == null ? void 0 : E.data) == null ? void 0 : S.accessToken;
            return A ? (u.headers.authorization = `Bearer ${A}`, n(u)) : (i({ message: "Session expired. Please login again." }), Promise.reject(s));
          } catch (_) {
            return i({ message: "Session expired. Please login again." }), Promise.reject(_);
          }
        }
        return Promise.reject(s);
      }
    );
    return () => {
      n.interceptors.request.eject(f), n.interceptors.response.eject(h);
    };
  }, [l, c, n, o, i]), n;
}, tt = (n, o = "auth") => {
  const { authAxios: l } = N(), i = n || l;
  return de({
    mutationFn: (c) => i({
      url: o,
      method: "POST",
      data: c
    }),
    mutationKey: ["login"]
  });
}, st = ({
  allowedPerms: n,
  unauthorizedPath: o = "/unauthorized",
  loginPath: l = "/"
}) => {
  var h;
  const { auth: i } = N(), c = Fr();
  return ((h = i == null ? void 0 : i.permissions) == null ? void 0 : h.some((s) => n == null ? void 0 : n.includes(s.perm_key))) ? /* @__PURE__ */ r.jsx(Dr, {}) : i != null && i.email ? /* @__PURE__ */ r.jsx(ce, { to: o, state: { from: c }, replace: !0 }) : /* @__PURE__ */ r.jsx(ce, { to: l, state: { from: c }, replace: !0 });
}, nt = ({
  LoginComponent: n,
  RegisterComponent: o,
  UnauthorizedComponent: l,
  LayoutComponent: i = ({ children: s }) => /* @__PURE__ */ r.jsx(r.Fragment, { children: s }),
  postLoginRedirect: c = "/",
  children: f,
  publicRoutes: h = []
}) => {
  const { auth: s } = N(), u = !!s.email;
  return /* @__PURE__ */ r.jsxs(Vr, { children: [
    h.map(({ path: p, element: d }) => /* @__PURE__ */ r.jsx(B, { element: /* @__PURE__ */ r.jsx(i, {}), children: /* @__PURE__ */ r.jsx(B, { path: p, element: d }) }, p)),
    u ? /* @__PURE__ */ r.jsxs(B, { element: /* @__PURE__ */ r.jsx(i, {}), children: [
      f,
      /* @__PURE__ */ r.jsx(B, { path: "/unauthorized", element: /* @__PURE__ */ r.jsx(l, {}) }),
      /* @__PURE__ */ r.jsx(B, { path: "*", element: /* @__PURE__ */ r.jsx(ce, { to: c, replace: !0 }) })
    ] }) : /* @__PURE__ */ r.jsxs(B, { element: /* @__PURE__ */ r.jsx(i, {}), children: [
      /* @__PURE__ */ r.jsx(B, { path: "/login", element: /* @__PURE__ */ r.jsx(n, { successRoute: c }) }),
      /* @__PURE__ */ r.jsx(B, { path: "/register", element: /* @__PURE__ */ r.jsx(o, {}) }),
      /* @__PURE__ */ r.jsx(B, { path: "*", element: /* @__PURE__ */ r.jsx(ce, { to: "/login", replace: !0 }) })
    ] })
  ] });
}, at = ({
  loginMutation: n,
  // result of useLogin hook
  successRoute: o = "/",
  registerPath: l = "/register",
  resetPath: i = "/forgot-password",
  allowStay: c = !1,
  onLoginSuccess: f
}) => {
  var V, q;
  const [h, s] = be(""), { auth: u, setAuth: p } = N(), d = Qe(), w = se({
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: !1
    }
  }), { handleSubmit: E, register: S, formState: { errors: _ } } = w, A = (j) => {
    s(""), n.mutate(j);
  };
  return we(() => {
    var j, z;
    if (n.isSuccess) {
      s("");
      try {
        const $ = (z = (j = n.data) == null ? void 0 : j.data) == null ? void 0 : z.accessToken, C = Ir($);
        if (C.status !== "ACTIVE") {
          s("Successful login... but user is not Active. See system administrator");
          return;
        }
        const W = {
          userId: C.userId,
          email: C.email,
          first: C.first,
          last: C.last,
          status: C.status,
          permissions: C.permissions,
          accessToken: $
        };
        p(W), f && f(W), d(o);
      } catch ($) {
        console.error("Token decoding error:", $), s("Error processing login response");
      }
    }
  }, [n.isSuccess, n.data, d, p, o, f]), we(() => {
    var j, z, $, C;
    if (n.isError) {
      const W = (($ = (z = (j = n.error) == null ? void 0 : j.response) == null ? void 0 : z.data) == null ? void 0 : $.error) || ((C = n.error) == null ? void 0 : C.message);
      s(W);
    }
  }, [n.isError, n.error]), /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "33%" }, margin: "auto", padding: "20px" }, children: [
    n.isLoading && /* @__PURE__ */ r.jsx(Y, { severity: "info", children: "Logging on to system..." }),
    h && /* @__PURE__ */ r.jsx(Y, { severity: "error", children: h }),
    /* @__PURE__ */ r.jsx(g, { variant: "h5", children: "Login" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: E(A), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...S("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          margin: "normal",
          size: "small",
          error: !!_.email,
          helperText: (V = _.email) == null ? void 0 : V.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...S("password"),
          label: "Password",
          type: "password",
          placeholder: "Enter password",
          margin: "normal",
          size: "small",
          error: !!_.password,
          helperText: (q = _.password) == null ? void 0 : q.message
        }
      ),
      /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: i, children: "Reset Password" }) }),
      /* @__PURE__ */ r.jsx(ne, { sx: { margin: "10px" }, variant: "outlined", type: "submit", children: "Submit" })
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: l, children: "Register to Login" }) })
  ] });
};
function fe(n, o, l) {
  return o === void 0 && (o = {}), l === void 0 && (l = {}), function(i, c, f) {
    try {
      return Promise.resolve(function(h, s) {
        try {
          var u = (o.context && process.env.NODE_ENV === "development" && console.warn("You should not used the yup options context. Please, use the 'useForm' context object instead"), Promise.resolve(n[l.mode === "sync" ? "validateSync" : "validate"](i, Object.assign({ abortEarly: !1 }, o, { context: c }))).then(function(p) {
            return f.shouldUseNativeValidation && Lr({}, f), { values: l.raw ? i : p, errors: {} };
          }));
        } catch (p) {
          return s(p);
        }
        return u && u.then ? u.then(void 0, s) : u;
      }(0, function(h) {
        if (!h.inner) throw h;
        return { values: {}, errors: Yr((s = h, u = !f.shouldUseNativeValidation && f.criteriaMode === "all", (s.inner || []).reduce(function(p, d) {
          if (p[d.path] || (p[d.path] = { message: d.message, type: d.type }), u) {
            var w = p[d.path].types, E = w && w[d.type];
            p[d.path] = $r(d.path, u, p, d.type, E ? [].concat(E, d.message) : d.message);
          }
          return p;
        }, {})), f) };
        var s, u;
      }));
    } catch (h) {
      return Promise.reject(h);
    }
  };
}
const it = ({
  onSubmit: n,
  loginPath: o = "/login"
}) => {
  var d, w, E;
  Qe();
  const l = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, c = k.object().shape({
    email: k.string().email("Invalid email").required("Required"),
    password: k.string().matches(l, "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character").required("Required"),
    confirmPwd: k.string().oneOf([k.ref("password"), null], "Passwords must match").required("Required")
  }), f = se({
    defaultValues: {
      email: "",
      password: "",
      confirmPwd: ""
    },
    resolver: fe(c)
  }), { handleSubmit: h, register: s, formState: { errors: u } } = f, p = (S) => {
    n ? n(S) : console.log("Registration submitted:", S);
  };
  return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "33%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", children: "Register" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: h(p), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...s("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          margin: "normal",
          size: "small",
          error: !!u.email,
          helperText: (d = u.email) == null ? void 0 : d.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...s("password"),
          label: "Password",
          type: "password",
          placeholder: "Enter password",
          margin: "normal",
          size: "small",
          error: !!u.password,
          helperText: (w = u.password) == null ? void 0 : w.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...s("confirmPwd"),
          label: "Confirm Password",
          type: "password",
          placeholder: "Re-enter Password",
          margin: "normal",
          size: "small",
          error: !!u.confirmPwd,
          helperText: (E = u.confirmPwd) == null ? void 0 : E.message
        }
      ),
      /* @__PURE__ */ r.jsx(ne, { sx: { margin: "10px" }, variant: "outlined", type: "submit", children: "Submit" })
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: o, children: "Login if already a user" }) })
  ] });
}, ot = () => /* @__PURE__ */ r.jsxs(
  X,
  {
    sx: {
      margin: "10vh",
      alignItems: "center"
    },
    children: [
      /* @__PURE__ */ r.jsx(g, { variant: "h4", children: "You are not authorized to access this page." }),
      /* @__PURE__ */ r.jsx("br", {}),
      /* @__PURE__ */ r.jsx("br", {}),
      /* @__PURE__ */ r.jsx(g, { variant: "h5", children: "Contact your system administrator for access rights." })
    ]
  }
), lt = ({
  onSubmit: n,
  isLoading: o = !1,
  isSuccess: l = !1,
  successMessage: i = "If this email is not already registered, you will receive a verification email shortly.",
  error: c,
  loginPath: f = "/login"
}) => {
  var E, S, _, A, V, q;
  const h = k.object().shape({
    email: k.string().email("Invalid email").required("Email is required"),
    first: k.string().required("First name is required"),
    last: k.string().required("Last name is required"),
    requestNote: k.string().max(256, "Request note must be 256 characters or less")
  }), s = se({
    defaultValues: {
      email: "",
      first: "",
      last: "",
      requestNote: ""
    },
    resolver: fe(h)
  }), { handleSubmit: u, register: p, formState: { errors: d } } = s, w = (j) => {
    n && n(j);
  };
  return l ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Registration Submitted" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: i }),
    /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "Please check your email for a verification link. The link will expire in 24 hours." }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", children: "If you don't receive an email within a few minutes, check your spam folder." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Request Access" }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Fill out this form to request access. An administrator will review your request after you verify your email." }),
    c && /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: ((S = (E = c.response) == null ? void 0 : E.data) == null ? void 0 : S.error) || c.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: u(w), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...p("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!d.email,
          helperText: (_ = d.email) == null ? void 0 : _.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...p("first"),
          label: "First Name",
          type: "text",
          placeholder: "Enter your first name",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!d.first,
          helperText: (A = d.first) == null ? void 0 : A.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...p("last"),
          label: "Last Name",
          type: "text",
          placeholder: "Enter your last name",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!d.last,
          helperText: (V = d.last) == null ? void 0 : V.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...p("requestNote"),
          label: "Request Note (Optional)",
          type: "text",
          placeholder: "Why do you need access?",
          margin: "normal",
          size: "small",
          multiline: !0,
          rows: 3,
          error: !!d.requestNote,
          helperText: ((q = d.requestNote) == null ? void 0 : q.message) || "Max 256 characters"
        }
      ),
      /* @__PURE__ */ r.jsx(
        ne,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: o,
          children: o ? /* @__PURE__ */ r.jsx(te, { size: 24 }) : "Submit Request"
        }
      )
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Already have an account? Login" }) })
  ] });
}, ut = ({
  isLoading: n = !1,
  isSuccess: o = !1,
  isError: l = !1,
  error: i,
  data: c,
  loginPath: f = "/login"
}) => {
  var h, s;
  if (n)
    return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx(te, { size: 48, sx: { mb: 2 } }),
      /* @__PURE__ */ r.jsx(g, { variant: "h6", children: "Verifying your email..." })
    ] });
  if (l) {
    const u = ((s = (h = i == null ? void 0 : i.response) == null ? void 0 : h.data) == null ? void 0 : s.error) || (i == null ? void 0 : i.message) || "Verification failed";
    return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
      /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Verification Failed" }),
      /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: u }),
      /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "The verification link may have expired or already been used." }),
      /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", children: "If you need a new verification link, please submit a new registration request." }),
      /* @__PURE__ */ r.jsxs(b, { sx: { mt: 3 }, children: [
        /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: "/register", children: "Submit New Request" }),
        /* @__PURE__ */ r.jsx(b, { component: "span", sx: { mx: 2 }, children: "|" }),
        /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Return to Login" })
      ] })
    ] });
  }
  return o ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Email Verified" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: (c == null ? void 0 : c.message) || "Your email has been verified successfully." }),
    /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "Your request is now pending administrator review." }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", children: "You will receive an email when your request has been reviewed. This typically takes 1-2 business days." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsx(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: /* @__PURE__ */ r.jsx(g, { variant: "h6", children: "Processing verification..." }) });
}, ct = ({
  isValidating: n = !1,
  isValidToken: o = !1,
  validationError: l,
  userEmail: i,
  userFirst: c,
  onSubmit: f,
  isSubmitting: h = !1,
  isSuccess: s = !1,
  submitError: u,
  loginPath: p = "/login",
  passwordRegex: d = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  passwordMessage: w = "8-24 characters, must include uppercase and lowercase letters, a number and a special character (!@#$%)"
}) => {
  var j, z, $, C, W, ae;
  const E = k.object().shape({
    password: k.string().matches(d, w).required("Password is required"),
    confirmPassword: k.string().oneOf([k.ref("password"), null], "Passwords must match").required("Please confirm your password")
  }), S = se({
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
    resolver: fe(E)
  }), { handleSubmit: _, register: A, formState: { errors: V } } = S, q = (H) => {
    f && f({ password: H.password });
  };
  if (n)
    return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx(te, { size: 48, sx: { mb: 2 } }),
      /* @__PURE__ */ r.jsx(g, { variant: "h6", children: "Validating your link..." })
    ] });
  if (!o && !n) {
    const H = ((z = (j = l == null ? void 0 : l.response) == null ? void 0 : j.data) == null ? void 0 : z.error) || (l == null ? void 0 : l.message) || "Invalid or expired link";
    return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
      /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Invalid Link" }),
      /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: H }),
      /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "This password setup link is invalid or has expired." }),
      /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", children: "If you believe this is an error, please contact an administrator." }),
      /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: p, children: "Return to Login" }) })
    ] });
  }
  return s ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Password Set Successfully" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: "Your password has been set. You can now log in to your account." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: p, children: "Go to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Set Your Password" }),
    c && /* @__PURE__ */ r.jsxs(g, { variant: "body1", sx: { mb: 1 }, children: [
      "Welcome, ",
      c,
      "!"
    ] }),
    i && /* @__PURE__ */ r.jsxs(g, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: [
      "Setting password for: ",
      i
    ] }),
    u && /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: ((C = ($ = u.response) == null ? void 0 : $.data) == null ? void 0 : C.error) || u.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: _(q), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...A("password"),
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!V.password,
          helperText: (W = V.password) == null ? void 0 : W.message
        }
      ),
      /* @__PURE__ */ r.jsx(g, { variant: "caption", color: "text.secondary", children: w }),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...A("confirmPassword"),
          label: "Confirm Password",
          type: "password",
          placeholder: "Re-enter your password",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!V.confirmPassword,
          helperText: (ae = V.confirmPassword) == null ? void 0 : ae.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        ne,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: h,
          children: h ? /* @__PURE__ */ r.jsx(te, { size: 24 }) : "Set Password"
        }
      )
    ] }) })
  ] });
}, dt = ({
  title: n = "Registration Complete",
  message: o = "Your account is now active. You can log in with your credentials.",
  loginPath: l = "/login"
}) => /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
  /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: n }),
  /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: o }),
  /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: l, children: "Go to Login" }) })
] }), ft = ({
  onSubmit: n,
  isLoading: o = !1,
  isSuccess: l = !1,
  successMessage: i = "If an account exists for this email, you will receive a password reset link shortly.",
  error: c,
  loginPath: f = "/login"
}) => {
  var E, S, _;
  const h = k.object().shape({
    email: k.string().email("Invalid email").required("Email is required")
  }), s = se({
    defaultValues: {
      email: ""
    },
    resolver: fe(h)
  }), { handleSubmit: u, register: p, formState: { errors: d } } = s, w = (A) => {
    n && n(A);
  };
  return l ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Reset Link Sent" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: i }),
    /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "Please check your email for a link to reset your password." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Reset Password" }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Enter your email address below and we'll send you a link to reset your password." }),
    c && /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: ((S = (E = c.response) == null ? void 0 : E.data) == null ? void 0 : S.error) || c.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: u(w), noValidate: !0, children: /* @__PURE__ */ r.jsxs(X, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...p("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!d.email,
          helperText: (_ = d.email) == null ? void 0 : _.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        ne,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: o,
          children: o ? /* @__PURE__ */ r.jsx(te, { size: 24 }) : "Send Reset Link"
        }
      )
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Back to Login" }) })
  ] });
}, mt = (n, o = "/register/submit") => {
  const { authAxios: l } = N(), i = n || l;
  return de({
    mutationFn: async ({ email: c, first: f, last: h, requestNote: s }) => (await i.post(o, {
      email: c,
      first: f,
      last: h,
      requestNote: s
    })).data
  });
}, ht = (n, o, l = "/register/verify") => {
  const { authAxios: i } = N(), c = n || i;
  return Ee({
    queryKey: ["emailVerification", o],
    queryFn: async () => {
      if (!o)
        throw new Error("No verification token provided");
      return (await c.get(`${l}/${o}`)).data;
    },
    enabled: !!o,
    retry: !1,
    refetchOnWindowFocus: !1
  });
}, Br = (n, o, l = "/register/setup") => {
  const { authAxios: i } = N(), c = n || i;
  return Ee({
    queryKey: ["validateSetupToken", o],
    queryFn: async () => {
      if (!o)
        throw new Error("No setup token provided");
      return (await c.get(`${l}/${o}`)).data;
    },
    enabled: !!o,
    retry: !1,
    refetchOnWindowFocus: !1
  });
}, Ur = (n, o = "/register/setup") => {
  const { authAxios: l } = N(), i = n || l;
  return de({
    mutationFn: async ({ token: c, password: f }) => (await i.post(`${o}/${c}`, { password: f })).data
  });
}, pt = (n, o = "/register/forgot-password") => {
  const { authAxios: l } = N(), i = n || l;
  return de({
    mutationFn: async ({ email: c }) => (await i.post(o, { email: c })).data
  });
}, xt = (n, o, l = "/register/setup") => {
  var f, h, s;
  const i = Br(n, o, l), c = Ur(n, l);
  return {
    validation: i,
    setPassword: c,
    isValidToken: i.isSuccess && ((f = i.data) == null ? void 0 : f.valid),
    userEmail: (h = i.data) == null ? void 0 : h.email,
    userFirst: (s = i.data) == null ? void 0 : s.first
  };
};
export {
  er as AuthContext,
  et as AuthProvider,
  ut as EmailVerification,
  at as Login,
  ft as PasswordResetRequest,
  ct as PasswordSetup,
  it as Register,
  lt as RegistrationRequest,
  dt as RegistrationSuccess,
  st as RequireAuth,
  nt as StandardAuthRoutes,
  ot as Unauthorized,
  N as useAuth,
  ht as useEmailVerification,
  tt as useLogin,
  xt as usePasswordSetup,
  Wr as useRefreshToken,
  mt as useRegistrationSubmit,
  pt as useRequestPasswordReset,
  rt as useSecureAxios,
  Ur as useSetPassword,
  Br as useValidateSetupToken
};
