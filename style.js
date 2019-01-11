(function (blink) {
  'use strict';

  var PearsonheDevStyle = function () {
    blink.theme.styles.pearsonhe.apply(this, arguments);
  }

  PearsonheDevStyle.prototype = {
    parent: blink.theme.styles.pearsonhe.prototype,
    bodyClassName: 'content_type_clase_pearsonhe_dev',
    ckEditorStyles: {
      name: 'pearsonhe-dev',
      styles: []
    },
    init: function() {
      this.parent.init.call(this.parent, this);
    },
    removeFinalSlide: function () {
      this.parent.removeFinalSlide.call(this.parent, this, true);
    },

    /**
    * Realiza operaciones al cargar los datos del curso.
    * @param  {Object} data Información del curso.
    */
    onCourseDataLoaded: function(data) {
      console.log("onCourseLoaded");
    },

    loadUserData: function() {
      var urlSeguimiento = '/include/javascript/seguimientoCurso.js.php?idcurso=' + idcurso;
      loadScript(urlSeguimiento, true, (function(data) {
        window.actividades = actividades;
      }).bind(this));
    },

  };


  PearsonheDevStyle.prototype = _.extend({}, new blink.theme.styles.pearsonhe(), PearsonheDevStyle.prototype);

  blink.theme.styles['pearsonhe-dev'] = PearsonheDevStyle;

  blink.events.on('digitalbook:bpdfloaded', function () {
    // Ejemplo carga de datos del curso desde un libro digital.
    blink.getCourse(idcurso).done(function (data) {
      var style = new PearsonheDevStyle;
      style.onCourseDataLoaded(data);
    });
  });

  // Remove Info
  blink.events.on('indexLoaded', function(){
    console.log("Index loaded");
  });

})( blink );
