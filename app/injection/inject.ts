/**
 * Originally created by Johny Reeves github.com/jonnyreeves/ts-prop-injection.
 * Potential modifications from original.
 */

export function inject(injectionKey : string) {

  // Our decorator provides a factory function which will be invoked with an
  // instance of the decorated Class and the name of the decorated property.
  return function recordInjection(target : Object, decoratedPropertyName : string) : void {

    // Get a reference to the Class of the target object which has been
    // decorated.
    const targetType : { __inject__?: Object } = target.constructor;

    if (!targetType.hasOwnProperty('__inject__')) {
      targetType.__inject__ = {};
    }

    // Associate this property with the injectionKey provided in the 
    // decorator call
    targetType.__inject__[decoratedPropertyName] = injectionKey;
  };
}
