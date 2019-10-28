v. 0.4.0
-----------
*  useClassState - check newState!=prevState before update
*  useClassEffect - fix ConcurrentMode 
*  hooks stack counter - fix ConcurrentMode
*  build optimization - removed babel slicedToArray 

v. 0.3.6
-----------
*  add ESM build
*  dev update babel - rollup - eslint

v. 0.3.4
-----------
*  upgrade to babel7

v. 0.3.3
-----------
*  removed module on package.json

v. 0.3.2
-----------
*  useClassContext use ReactInternals readContext

v. 0.3.1
-----------
*  fix export useClassContext

v. 0.3.0
-----------
* added useClassContext
* added useClassLayoutEffect alias

v. 0.2.0
-----------
* setState support callback => setState(value,callback);
* fix circular dep.

v. 0.1.9
-----------
* added useClassRef (and refCallback for React15 support)
* added setState() accept update func (prevState)=> nextState 
* internal useClassRef for optimization

v. 0.1.8
-----------
* inputsArrayEqual check on effect inputs
* invariant for useClassEffect return 
* added useClassCallback.createStack

v. 0.1.6
-----------
* fix peerDependencies for React >=15.3.2
* check typeof useEffect return is a function

v. 0.1.5
-----
+ support react 15.3.2-15.6.2 (polyfill needed)
+ support useClassState initialValue creator (type function) for lazy initialization
+ fix effect execution order 

v. 0.1.4
-----------
* initial support only React >=16.0.0
