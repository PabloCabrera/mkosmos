/* Interface AbstractArea:
 * Base abstracta para implementaciones de Area
 */

/* size: [width, height] */
AbstractArea = function (size) {}

/* Obtener el tipo de superficie en las coordenadas dadas
 position: [x, y] */
AbstractArea.prototype.getSurfaceAtPosition = function (position) {}

/* Obtener el tipo de superficie en las coordenadas dadas */
AbstractArea.prototype.getSurfaceAt = function (x, y) {}

/* Establecer el tipo de superficie en un punto especifico */
AbstractArea.prototype.setSurfaceAtPosition = function (position, surface) {}

/* Obtener el tipo de superficie en un rectangulo */
AbstractArea.prototype.getSurfaceRect = function (left, top, right, bottom) {}

/* Obtener el tipo de superficie en un rectangulo */
AbstractArea.prototype.execOnSurfaceRect = function (left, top, right, bottom, handler, args) {}

/* Establecer el tipo de superficie en un punto especifico */
AbstractArea.prototype.setSurfaceAt = function (x, y, surface) {}

/* Establecer el tipo de superficie en un area rectangular */
AbstractArea.prototype.setSurfaceRectPosition = function (position, size, surface) {}

/* Establecer el tipo de superficie en un area rectangular */
AbstractArea.prototype.setSurfaceRect = function (x, y, width, height, surface) {}

/* Establecer el tipo de superficie en un area circular */
AbstractArea.prototype.setSurfaceCirclePosition = function (positon, radius, surface) {}

/* Establecer el tipo de superficie en un area circular */
AbstractArea.prototype.setSurfaceCircle = function (x, y, radius, surface) {}
