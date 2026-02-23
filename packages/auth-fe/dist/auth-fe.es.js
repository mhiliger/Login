import Ze, { createContext as Or, useState as be, useContext as Cr, useEffect as we } from "react";
import { useQuery as Ee, useMutation as de } from "@tanstack/react-query";
import { useLocation as Ar, Outlet as qr, Navigate as ce, Routes as Fr, Route as W, useNavigate as Qe, NavLink as D } from "react-router-dom";
import { useForm as te, appendErrors as Dr } from "react-hook-form";
import Vr from "jwt-decode";
import { Box as b, Alert as Y, Typography as g, Stack as J, TextField as L, Button as se, CircularProgress as re } from "@mui/material";
import { validateFieldsNatively as $r, toNestErrors as Ir } from "@hookform/resolvers";
import * as k from "yup";
var Re = { exports: {} }, Q = {};
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
function Lr() {
  if (Xe) return Q;
  Xe = 1;
  var s = Ze, i = Symbol.for("react.element"), l = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, m = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(n, u, h) {
    var c, w = {}, E = null, S = null;
    h !== void 0 && (E = "" + h), u.key !== void 0 && (E = "" + u.key), u.ref !== void 0 && (S = u.ref);
    for (c in u) o.call(u, c) && !f.hasOwnProperty(c) && (w[c] = u[c]);
    if (n && n.defaultProps) for (c in u = n.defaultProps, u) w[c] === void 0 && (w[c] = u[c]);
    return { $$typeof: i, type: n, key: E, ref: S, props: w, _owner: m.current };
  }
  return Q.Fragment = l, Q.jsx = p, Q.jsxs = p, Q;
}
var ee = {};
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
function Yr() {
  return He || (He = 1, process.env.NODE_ENV !== "production" && function() {
    var s = Ze, i = Symbol.for("react.element"), l = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), n = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), _ = Symbol.iterator, A = "@@iterator";
    function V(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = _ && e[_] || e[A];
      return typeof t == "function" ? t : null;
    }
    var q = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(e) {
      {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), d = 1; d < t; d++)
          a[d - 1] = arguments[d];
        N("error", e, a);
      }
    }
    function N(e, t, a) {
      {
        var d = q.ReactDebugCurrentFrame, y = d.getStackAddendum();
        y !== "" && (t += "%s", a = a.concat([y]));
        var R = a.map(function(v) {
          return String(v);
        });
        R.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, R);
      }
    }
    var $ = !1, O = !1, z = !1, ae = !1, X = !1, Se;
    Se = Symbol.for("react.module.reference");
    function rr(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === o || e === f || X || e === m || e === h || e === c || ae || e === S || $ || O || z || typeof e == "object" && e !== null && (e.$$typeof === E || e.$$typeof === w || e.$$typeof === p || e.$$typeof === n || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Se || e.getModuleId !== void 0));
    }
    function tr(e, t, a) {
      var d = e.displayName;
      if (d)
        return d;
      var y = t.displayName || t.name || "";
      return y !== "" ? a + "(" + y + ")" : a;
    }
    function _e(e) {
      return e.displayName || "Context";
    }
    function B(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case o:
          return "Fragment";
        case l:
          return "Portal";
        case f:
          return "Profiler";
        case m:
          return "StrictMode";
        case h:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case n:
            var t = e;
            return _e(t) + ".Consumer";
          case p:
            var a = e;
            return _e(a._context) + ".Provider";
          case u:
            return tr(e, e.render, "ForwardRef");
          case w:
            var d = e.displayName || null;
            return d !== null ? d : B(e.type) || "Memo";
          case E: {
            var y = e, R = y._payload, v = y._init;
            try {
              return B(v(R));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var U = Object.assign, H = 0, Te, Pe, ke, Oe, Ce, Ae, qe;
    function Fe() {
    }
    Fe.__reactDisabledLog = !0;
    function sr() {
      {
        if (H === 0) {
          Te = console.log, Pe = console.info, ke = console.warn, Oe = console.error, Ce = console.group, Ae = console.groupCollapsed, qe = console.groupEnd;
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
        H++;
      }
    }
    function nr() {
      {
        if (H--, H === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: U({}, e, {
              value: Te
            }),
            info: U({}, e, {
              value: Pe
            }),
            warn: U({}, e, {
              value: ke
            }),
            error: U({}, e, {
              value: Oe
            }),
            group: U({}, e, {
              value: Ce
            }),
            groupCollapsed: U({}, e, {
              value: Ae
            }),
            groupEnd: U({}, e, {
              value: qe
            })
          });
        }
        H < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var me = q.ReactCurrentDispatcher, pe;
    function ie(e, t, a) {
      {
        if (pe === void 0)
          try {
            throw Error();
          } catch (y) {
            var d = y.stack.trim().match(/\n( *(at )?)/);
            pe = d && d[1] || "";
          }
        return `
` + pe + e;
      }
    }
    var he = !1, oe;
    {
      var ar = typeof WeakMap == "function" ? WeakMap : Map;
      oe = new ar();
    }
    function De(e, t) {
      if (!e || he)
        return "";
      {
        var a = oe.get(e);
        if (a !== void 0)
          return a;
      }
      var d;
      he = !0;
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
              d = F;
            }
            Reflect.construct(e, [], v);
          } else {
            try {
              v.call();
            } catch (F) {
              d = F;
            }
            e.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            d = F;
          }
          e();
        }
      } catch (F) {
        if (F && d && typeof F.stack == "string") {
          for (var x = F.stack.split(`
`), C = d.stack.split(`
`), T = x.length - 1, P = C.length - 1; T >= 1 && P >= 0 && x[T] !== C[P]; )
            P--;
          for (; T >= 1 && P >= 0; T--, P--)
            if (x[T] !== C[P]) {
              if (T !== 1 || P !== 1)
                do
                  if (T--, P--, P < 0 || x[T] !== C[P]) {
                    var I = `
` + x[T].replace(" at new ", " at ");
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && oe.set(e, I), I;
                  }
                while (T >= 1 && P >= 0);
              break;
            }
        }
      } finally {
        he = !1, me.current = R, nr(), Error.prepareStackTrace = y;
      }
      var G = e ? e.displayName || e.name : "", K = G ? ie(G) : "";
      return typeof e == "function" && oe.set(e, K), K;
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
        case h:
          return ie("Suspense");
        case c:
          return ie("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return ir(e.render);
          case w:
            return le(e.type, t, a);
          case E: {
            var d = e, y = d._payload, R = d._init;
            try {
              return le(R(y), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    var Z = Object.prototype.hasOwnProperty, Ve = {}, $e = q.ReactDebugCurrentFrame;
    function ue(e) {
      if (e) {
        var t = e._owner, a = le(e.type, e._source, t ? t.type : null);
        $e.setExtraStackFrame(a);
      } else
        $e.setExtraStackFrame(null);
    }
    function lr(e, t, a, d, y) {
      {
        var R = Function.call.bind(Z);
        for (var v in e)
          if (R(e, v)) {
            var x = void 0;
            try {
              if (typeof e[v] != "function") {
                var C = Error((d || "React class") + ": " + a + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              x = e[v](t, v, d, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              x = T;
            }
            x && !(x instanceof Error) && (ue(y), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", a, v, typeof x), ue(null)), x instanceof Error && !(x.message in Ve) && (Ve[x.message] = !0, ue(y), j("Failed %s type: %s", a, x.message), ue(null));
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
      if (Z.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function pr(e) {
      if (Z.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function hr(e, t) {
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
    var gr = function(e, t, a, d, y, R, v) {
      var x = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: i,
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
        value: d
      }), Object.defineProperty(x, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    };
    function yr(e, t, a, d, y) {
      {
        var R, v = {}, x = null, C = null;
        a !== void 0 && (Le(a), x = "" + a), pr(t) && (Le(t.key), x = "" + t.key), mr(t) && (C = t.ref, hr(t, y));
        for (R in t)
          Z.call(t, R) && !fr.hasOwnProperty(R) && (v[R] = t[R]);
        if (e && e.defaultProps) {
          var T = e.defaultProps;
          for (R in T)
            v[R] === void 0 && (v[R] = T[R]);
        }
        if (x || C) {
          var P = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          x && xr(v, P), C && vr(v, P);
        }
        return gr(e, x, C, y, d, Ye.current, v);
      }
    }
    var ve = q.ReactCurrentOwner, We = q.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var t = e._owner, a = le(e.type, e._source, t ? t.type : null);
        We.setExtraStackFrame(a);
      } else
        We.setExtraStackFrame(null);
    }
    var ge;
    ge = !1;
    function ye(e) {
      return typeof e == "object" && e !== null && e.$$typeof === i;
    }
    function Be() {
      {
        if (ve.current) {
          var e = B(ve.current.type);
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
        var d = "";
        e && e._owner && e._owner !== ve.current && (d = " It was passed a child from " + B(e._owner.type) + "."), M(e), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, d), M(null);
      }
    }
    function Me(e, t) {
      {
        if (typeof e != "object")
          return;
        if (xe(e))
          for (var a = 0; a < e.length; a++) {
            var d = e[a];
            ye(d) && Ke(d, t);
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
          var d = B(t);
          lr(a, e.props, "prop", d, e);
        } else if (t.PropTypes !== void 0 && !ge) {
          ge = !0;
          var y = B(t);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", y || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rr(e) {
      {
        for (var t = Object.keys(e.props), a = 0; a < t.length; a++) {
          var d = t[a];
          if (d !== "children" && d !== "key") {
            M(e), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), j("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    var Ge = {};
    function Je(e, t, a, d, y, R) {
      {
        var v = rr(e);
        if (!v) {
          var x = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var C = jr();
          C ? x += C : x += Be();
          var T;
          e === null ? T = "null" : xe(e) ? T = "array" : e !== void 0 && e.$$typeof === i ? (T = "<" + (B(e.type) || "Unknown") + " />", x = " Did you accidentally export a JSX literal instead of a component?") : T = typeof e, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", T, x);
        }
        var P = yr(e, t, a, y, R);
        if (P == null)
          return P;
        if (v) {
          var I = t.children;
          if (I !== void 0)
            if (d)
              if (xe(I)) {
                for (var G = 0; G < I.length; G++)
                  Me(I[G], e);
                Object.freeze && Object.freeze(I);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Me(I, e);
        }
        if (Z.call(t, "key")) {
          var K = B(e), F = Object.keys(t).filter(function(kr) {
            return kr !== "key";
          }), je = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ge[K + je]) {
            var Pr = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            j(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, je, K, Pr, K), Ge[K + je] = !0;
          }
        }
        return e === o ? Rr(P) : wr(P), P;
      }
    }
    function Er(e, t, a) {
      return Je(e, t, a, !0);
    }
    function Sr(e, t, a) {
      return Je(e, t, a, !1);
    }
    var _r = Sr, Tr = Er;
    ee.Fragment = o, ee.jsx = _r, ee.jsxs = Tr;
  }()), ee;
}
process.env.NODE_ENV === "production" ? Re.exports = Lr() : Re.exports = Yr();
var r = Re.exports;
const er = Or({}), Hr = ({ children: s }) => {
  const [i, l] = be({}), [o, m] = be(void 0);
  return /* @__PURE__ */ r.jsx(er.Provider, { value: { auth: i, setAuth: l, user: o, setUser: m }, children: s });
}, ne = () => {
  const s = Cr(er);
  if (!s)
    throw new Error("useAuth must be used within an AuthProvider");
  return s;
}, Nr = (s, i = "refresh") => {
  const { setAuth: l } = ne(), o = () => s({ method: "GET", url: i }), { refetch: m } = Ee({
    queryKey: ["refresh"],
    queryFn: o,
    onSuccess: (f) => {
      l((p) => {
        var n;
        return { ...p, accessToken: (n = f == null ? void 0 : f.data) == null ? void 0 : n.accessToken };
      });
    },
    onError: (f) => {
      console.log("Refresh Failed", f);
    },
    enabled: !1,
    retry: !1
  });
  return m;
}, Zr = (s, i = "refresh") => {
  const { auth: l, setAuth: o } = ne(), m = Nr(s, i);
  return we(() => {
    const f = s.interceptors.request.use(
      (n) => (n.headers.authorization || (n.headers.authorization = `Bearer ${l == null ? void 0 : l.accessToken}`), n),
      (n) => Promise.reject(n)
    ), p = s.interceptors.response.use(
      (n) => n,
      async (n) => {
        var h, c, w, E, S;
        const u = n == null ? void 0 : n.config;
        if ((c = (h = n == null ? void 0 : n.response) == null ? void 0 : h.data) != null && c.error && (n.message = `${n.response.data.error} (${n.response.status})`), u.url === i)
          return Promise.reject(n);
        if (((w = n == null ? void 0 : n.response) == null ? void 0 : w.status) === 403 && !(u != null && u.sent)) {
          u.sent = !0;
          try {
            const _ = await m(), A = (S = (E = _ == null ? void 0 : _.data) == null ? void 0 : E.data) == null ? void 0 : S.accessToken;
            return A ? (u.headers.authorization = `Bearer ${A}`, s(u)) : (o({ message: "Session expired. Please login again." }), Promise.reject(n));
          } catch (_) {
            return o({ message: "Session expired. Please login again." }), Promise.reject(_);
          }
        }
        return Promise.reject(n);
      }
    );
    return () => {
      s.interceptors.request.eject(f), s.interceptors.response.eject(p);
    };
  }, [l, m, s, i, o]), s;
}, Qr = (s, i = "auth") => de({
  mutationFn: (l) => s({
    url: i,
    method: "POST",
    data: l
  }),
  mutationKey: ["login"]
}), et = ({
  allowedPerms: s,
  unauthorizedPath: i = "/unauthorized",
  loginPath: l = "/"
}) => {
  var p;
  const { auth: o } = ne(), m = Ar();
  return ((p = o == null ? void 0 : o.permissions) == null ? void 0 : p.some((n) => s == null ? void 0 : s.includes(n.perm_key))) ? /* @__PURE__ */ r.jsx(qr, {}) : o != null && o.email ? /* @__PURE__ */ r.jsx(ce, { to: i, state: { from: m }, replace: !0 }) : /* @__PURE__ */ r.jsx(ce, { to: l, state: { from: m }, replace: !0 });
}, rt = ({
  LoginComponent: s,
  RegisterComponent: i,
  UnauthorizedComponent: l,
  LayoutComponent: o = ({ children: n }) => /* @__PURE__ */ r.jsx(r.Fragment, { children: n }),
  postLoginRedirect: m = "/",
  children: f,
  publicRoutes: p = []
}) => {
  const { auth: n } = ne(), u = !!n.email;
  return /* @__PURE__ */ r.jsxs(Fr, { children: [
    p.map(({ path: h, element: c }) => /* @__PURE__ */ r.jsx(W, { element: /* @__PURE__ */ r.jsx(o, {}), children: /* @__PURE__ */ r.jsx(W, { path: h, element: c }) }, h)),
    u ? /* @__PURE__ */ r.jsxs(W, { element: /* @__PURE__ */ r.jsx(o, {}), children: [
      f,
      /* @__PURE__ */ r.jsx(W, { path: "/unauthorized", element: /* @__PURE__ */ r.jsx(l, {}) }),
      /* @__PURE__ */ r.jsx(W, { path: "*", element: /* @__PURE__ */ r.jsx(ce, { to: m, replace: !0 }) })
    ] }) : /* @__PURE__ */ r.jsxs(W, { element: /* @__PURE__ */ r.jsx(o, {}), children: [
      /* @__PURE__ */ r.jsx(W, { path: "/login", element: /* @__PURE__ */ r.jsx(s, { successRoute: m }) }),
      /* @__PURE__ */ r.jsx(W, { path: "/register", element: /* @__PURE__ */ r.jsx(i, {}) }),
      /* @__PURE__ */ r.jsx(W, { path: "*", element: /* @__PURE__ */ r.jsx(ce, { to: "/login", replace: !0 }) })
    ] })
  ] });
}, tt = ({
  loginMutation: s,
  // result of useLogin hook
  successRoute: i = "/",
  registerPath: l = "/register",
  resetPath: o = "/forgot-password",
  allowStay: m = !1,
  onLoginSuccess: f
}) => {
  var V, q;
  const [p, n] = be(""), { auth: u, setAuth: h } = ne(), c = Qe(), w = te({
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: !1
    }
  }), { handleSubmit: E, register: S, formState: { errors: _ } } = w, A = (j) => {
    n(""), s.mutate(j);
  };
  return we(() => {
    var j, N;
    if (s.isSuccess) {
      n("");
      try {
        const $ = (N = (j = s.data) == null ? void 0 : j.data) == null ? void 0 : N.accessToken, O = Vr($);
        if (O.status !== "ACTIVE") {
          n("Successful login... but user is not Active. See system administrator");
          return;
        }
        const z = {
          userId: O.userId,
          email: O.email,
          first: O.first,
          last: O.last,
          status: O.status,
          permissions: O.permissions,
          accessToken: $
        };
        h(z), f && f(z), c(i);
      } catch ($) {
        console.error("Token decoding error:", $), n("Error processing login response");
      }
    }
  }, [s.isSuccess, s.data, c, h, i, f]), we(() => {
    var j, N, $, O;
    if (s.isError) {
      const z = (($ = (N = (j = s.error) == null ? void 0 : j.response) == null ? void 0 : N.data) == null ? void 0 : $.error) || ((O = s.error) == null ? void 0 : O.message);
      n(z);
    }
  }, [s.isError, s.error]), /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "33%" }, margin: "auto", padding: "20px" }, children: [
    s.isLoading && /* @__PURE__ */ r.jsx(Y, { severity: "info", children: "Logging on to system..." }),
    p && /* @__PURE__ */ r.jsx(Y, { severity: "error", children: p }),
    /* @__PURE__ */ r.jsx(g, { variant: "h5", children: "Login" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: E(A), noValidate: !0, children: /* @__PURE__ */ r.jsxs(J, { spacing: 2, children: [
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
      /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: o, children: "Reset Password" }) }),
      /* @__PURE__ */ r.jsx(se, { sx: { margin: "10px" }, variant: "outlined", type: "submit", children: "Submit" })
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: l, children: "Register to Login" }) })
  ] });
};
function fe(s, i, l) {
  return i === void 0 && (i = {}), l === void 0 && (l = {}), function(o, m, f) {
    try {
      return Promise.resolve(function(p, n) {
        try {
          var u = (i.context && process.env.NODE_ENV === "development" && console.warn("You should not used the yup options context. Please, use the 'useForm' context object instead"), Promise.resolve(s[l.mode === "sync" ? "validateSync" : "validate"](o, Object.assign({ abortEarly: !1 }, i, { context: m }))).then(function(h) {
            return f.shouldUseNativeValidation && $r({}, f), { values: l.raw ? o : h, errors: {} };
          }));
        } catch (h) {
          return n(h);
        }
        return u && u.then ? u.then(void 0, n) : u;
      }(0, function(p) {
        if (!p.inner) throw p;
        return { values: {}, errors: Ir((n = p, u = !f.shouldUseNativeValidation && f.criteriaMode === "all", (n.inner || []).reduce(function(h, c) {
          if (h[c.path] || (h[c.path] = { message: c.message, type: c.type }), u) {
            var w = h[c.path].types, E = w && w[c.type];
            h[c.path] = Dr(c.path, u, h, c.type, E ? [].concat(E, c.message) : c.message);
          }
          return h;
        }, {})), f) };
        var n, u;
      }));
    } catch (p) {
      return Promise.reject(p);
    }
  };
}
const st = ({
  onSubmit: s,
  loginPath: i = "/login"
}) => {
  var c, w, E;
  Qe();
  const l = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, m = k.object().shape({
    email: k.string().email("Invalid email").required("Required"),
    password: k.string().matches(l, "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character").required("Required"),
    confirmPwd: k.string().oneOf([k.ref("password"), null], "Passwords must match").required("Required")
  }), f = te({
    defaultValues: {
      email: "",
      password: "",
      confirmPwd: ""
    },
    resolver: fe(m)
  }), { handleSubmit: p, register: n, formState: { errors: u } } = f, h = (S) => {
    s ? s(S) : console.log("Registration submitted:", S);
  };
  return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "33%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", children: "Register" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: p(h), noValidate: !0, children: /* @__PURE__ */ r.jsxs(J, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...n("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          margin: "normal",
          size: "small",
          error: !!u.email,
          helperText: (c = u.email) == null ? void 0 : c.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...n("password"),
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
          ...n("confirmPwd"),
          label: "Confirm Password",
          type: "password",
          placeholder: "Re-enter Password",
          margin: "normal",
          size: "small",
          error: !!u.confirmPwd,
          helperText: (E = u.confirmPwd) == null ? void 0 : E.message
        }
      ),
      /* @__PURE__ */ r.jsx(se, { sx: { margin: "10px" }, variant: "outlined", type: "submit", children: "Submit" })
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: i, children: "Login if already a user" }) })
  ] });
}, nt = () => /* @__PURE__ */ r.jsxs(
  J,
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
), at = ({
  onSubmit: s,
  isLoading: i = !1,
  isSuccess: l = !1,
  successMessage: o = "If this email is not already registered, you will receive a verification email shortly.",
  error: m,
  loginPath: f = "/login"
}) => {
  var E, S, _, A, V, q;
  const p = k.object().shape({
    email: k.string().email("Invalid email").required("Email is required"),
    first: k.string().required("First name is required"),
    last: k.string().required("Last name is required"),
    requestNote: k.string().max(256, "Request note must be 256 characters or less")
  }), n = te({
    defaultValues: {
      email: "",
      first: "",
      last: "",
      requestNote: ""
    },
    resolver: fe(p)
  }), { handleSubmit: u, register: h, formState: { errors: c } } = n, w = (j) => {
    s && s(j);
  };
  return l ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Registration Submitted" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: o }),
    /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "Please check your email for a verification link. The link will expire in 24 hours." }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", children: "If you don't receive an email within a few minutes, check your spam folder." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Request Access" }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Fill out this form to request access. An administrator will review your request after you verify your email." }),
    m && /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: ((S = (E = m.response) == null ? void 0 : E.data) == null ? void 0 : S.error) || m.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: u(w), noValidate: !0, children: /* @__PURE__ */ r.jsxs(J, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...h("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!c.email,
          helperText: (_ = c.email) == null ? void 0 : _.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...h("first"),
          label: "First Name",
          type: "text",
          placeholder: "Enter your first name",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!c.first,
          helperText: (A = c.first) == null ? void 0 : A.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...h("last"),
          label: "Last Name",
          type: "text",
          placeholder: "Enter your last name",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!c.last,
          helperText: (V = c.last) == null ? void 0 : V.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...h("requestNote"),
          label: "Request Note (Optional)",
          type: "text",
          placeholder: "Why do you need access?",
          margin: "normal",
          size: "small",
          multiline: !0,
          rows: 3,
          error: !!c.requestNote,
          helperText: ((q = c.requestNote) == null ? void 0 : q.message) || "Max 256 characters"
        }
      ),
      /* @__PURE__ */ r.jsx(
        se,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: i,
          children: i ? /* @__PURE__ */ r.jsx(re, { size: 24 }) : "Submit Request"
        }
      )
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Already have an account? Login" }) })
  ] });
}, it = ({
  isLoading: s = !1,
  isSuccess: i = !1,
  isError: l = !1,
  error: o,
  data: m,
  loginPath: f = "/login"
}) => {
  var p, n;
  if (s)
    return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx(re, { size: 48, sx: { mb: 2 } }),
      /* @__PURE__ */ r.jsx(g, { variant: "h6", children: "Verifying your email..." })
    ] });
  if (l) {
    const u = ((n = (p = o == null ? void 0 : o.response) == null ? void 0 : p.data) == null ? void 0 : n.error) || (o == null ? void 0 : o.message) || "Verification failed";
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
  return i ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Email Verified" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: (m == null ? void 0 : m.message) || "Your email has been verified successfully." }),
    /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "Your request is now pending administrator review." }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", children: "You will receive an email when your request has been reviewed. This typically takes 1-2 business days." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsx(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: /* @__PURE__ */ r.jsx(g, { variant: "h6", children: "Processing verification..." }) });
}, ot = ({
  isValidating: s = !1,
  isValidToken: i = !1,
  validationError: l,
  userEmail: o,
  userFirst: m,
  onSubmit: f,
  isSubmitting: p = !1,
  isSuccess: n = !1,
  submitError: u,
  loginPath: h = "/login",
  passwordRegex: c = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  passwordMessage: w = "8-24 characters, must include uppercase and lowercase letters, a number and a special character (!@#$%)"
}) => {
  var j, N, $, O, z, ae;
  const E = k.object().shape({
    password: k.string().matches(c, w).required("Password is required"),
    confirmPassword: k.string().oneOf([k.ref("password"), null], "Passwords must match").required("Please confirm your password")
  }), S = te({
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
    resolver: fe(E)
  }), { handleSubmit: _, register: A, formState: { errors: V } } = S, q = (X) => {
    f && f({ password: X.password });
  };
  if (s)
    return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px", textAlign: "center" }, children: [
      /* @__PURE__ */ r.jsx(re, { size: 48, sx: { mb: 2 } }),
      /* @__PURE__ */ r.jsx(g, { variant: "h6", children: "Validating your link..." })
    ] });
  if (!i && !s) {
    const X = ((N = (j = l == null ? void 0 : l.response) == null ? void 0 : j.data) == null ? void 0 : N.error) || (l == null ? void 0 : l.message) || "Invalid or expired link";
    return /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
      /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Invalid Link" }),
      /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: X }),
      /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "This password setup link is invalid or has expired." }),
      /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", children: "If you believe this is an error, please contact an administrator." }),
      /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: h, children: "Return to Login" }) })
    ] });
  }
  return n ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Password Set Successfully" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: "Your password has been set. You can now log in to your account." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: h, children: "Go to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Set Your Password" }),
    m && /* @__PURE__ */ r.jsxs(g, { variant: "body1", sx: { mb: 1 }, children: [
      "Welcome, ",
      m,
      "!"
    ] }),
    o && /* @__PURE__ */ r.jsxs(g, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: [
      "Setting password for: ",
      o
    ] }),
    u && /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: ((O = ($ = u.response) == null ? void 0 : $.data) == null ? void 0 : O.error) || u.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: _(q), noValidate: !0, children: /* @__PURE__ */ r.jsxs(J, { spacing: 2, children: [
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
          helperText: (z = V.password) == null ? void 0 : z.message
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
        se,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: p,
          children: p ? /* @__PURE__ */ r.jsx(re, { size: 24 }) : "Set Password"
        }
      )
    ] }) })
  ] });
}, lt = ({
  title: s = "Registration Complete",
  message: i = "Your account is now active. You can log in with your credentials.",
  loginPath: l = "/login"
}) => /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
  /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: s }),
  /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: i }),
  /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: l, children: "Go to Login" }) })
] }), ut = ({
  onSubmit: s,
  isLoading: i = !1,
  isSuccess: l = !1,
  successMessage: o = "If an account exists for this email, you will receive a password reset link shortly.",
  error: m,
  loginPath: f = "/login"
}) => {
  var E, S, _;
  const p = k.object().shape({
    email: k.string().email("Invalid email").required("Email is required")
  }), n = te({
    defaultValues: {
      email: ""
    },
    resolver: fe(p)
  }), { handleSubmit: u, register: h, formState: { errors: c } } = n, w = (A) => {
    s && s(A);
  };
  return l ? /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Reset Link Sent" }),
    /* @__PURE__ */ r.jsx(Y, { severity: "success", sx: { mb: 2 }, children: o }),
    /* @__PURE__ */ r.jsx(g, { variant: "body1", paragraph: !0, children: "Please check your email for a link to reset your password." }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 3 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Return to Login" }) })
  ] }) : /* @__PURE__ */ r.jsxs(b, { sx: { width: { xs: "90%", md: "50%" }, margin: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ r.jsx(g, { variant: "h5", gutterBottom: !0, children: "Reset Password" }),
    /* @__PURE__ */ r.jsx(g, { variant: "body2", color: "text.secondary", sx: { mb: 2 }, children: "Enter your email address below and we'll send you a link to reset your password." }),
    m && /* @__PURE__ */ r.jsx(Y, { severity: "error", sx: { mb: 2 }, children: ((S = (E = m.response) == null ? void 0 : E.data) == null ? void 0 : S.error) || m.message || "An error occurred" }),
    /* @__PURE__ */ r.jsx("form", { onSubmit: u(w), noValidate: !0, children: /* @__PURE__ */ r.jsxs(J, { spacing: 2, children: [
      /* @__PURE__ */ r.jsx(
        L,
        {
          ...h("email"),
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          margin: "normal",
          size: "small",
          required: !0,
          error: !!c.email,
          helperText: (_ = c.email) == null ? void 0 : _.message
        }
      ),
      /* @__PURE__ */ r.jsx(
        se,
        {
          sx: { margin: "10px" },
          variant: "contained",
          type: "submit",
          disabled: i,
          children: i ? /* @__PURE__ */ r.jsx(re, { size: 24 }) : "Send Reset Link"
        }
      )
    ] }) }),
    /* @__PURE__ */ r.jsx(b, { sx: { mt: 2 }, children: /* @__PURE__ */ r.jsx(D, { style: { textDecoration: "underline" }, to: f, children: "Back to Login" }) })
  ] });
}, ct = (s, i = "/register/submit") => de({
  mutationFn: async ({ email: l, first: o, last: m, requestNote: f }) => (await s.post(i, {
    email: l,
    first: o,
    last: m,
    requestNote: f
  })).data
}), dt = (s, i, l = "/register/verify") => Ee({
  queryKey: ["emailVerification", i],
  queryFn: async () => {
    if (!i)
      throw new Error("No verification token provided");
    return (await s.get(`${l}/${i}`)).data;
  },
  enabled: !!i,
  retry: !1,
  refetchOnWindowFocus: !1
}), zr = (s, i, l = "/register/setup") => Ee({
  queryKey: ["validateSetupToken", i],
  queryFn: async () => {
    if (!i)
      throw new Error("No setup token provided");
    return (await s.get(`${l}/${i}`)).data;
  },
  enabled: !!i,
  retry: !1,
  refetchOnWindowFocus: !1
}), Wr = (s, i = "/register/setup") => de({
  mutationFn: async ({ token: l, password: o }) => (await s.post(`${i}/${l}`, { password: o })).data
}), ft = (s, i = "/register/forgot-password") => de({
  mutationFn: async ({ email: l }) => (await s.post(i, { email: l })).data
}), mt = (s, i, l = "/register/setup") => {
  var f, p, n;
  const o = zr(s, i, l), m = Wr(s, l);
  return {
    validation: o,
    setPassword: m,
    isValidToken: o.isSuccess && ((f = o.data) == null ? void 0 : f.valid),
    userEmail: (p = o.data) == null ? void 0 : p.email,
    userFirst: (n = o.data) == null ? void 0 : n.first
  };
};
export {
  er as AuthContext,
  Hr as AuthProvider,
  it as EmailVerification,
  tt as Login,
  ut as PasswordResetRequest,
  ot as PasswordSetup,
  st as Register,
  at as RegistrationRequest,
  lt as RegistrationSuccess,
  et as RequireAuth,
  rt as StandardAuthRoutes,
  nt as Unauthorized,
  ne as useAuth,
  dt as useEmailVerification,
  Qr as useLogin,
  mt as usePasswordSetup,
  Nr as useRefreshToken,
  ct as useRegistrationSubmit,
  ft as useRequestPasswordReset,
  Zr as useSecureAxios,
  Wr as useSetPassword,
  zr as useValidateSetupToken
};
