(function (blink) {
	'use strict';

	var pearsonheDevStyle = function () {
			blink.theme.styles.pearsonhe.apply(this, arguments);
		},
		page = blink.currentPage;

	pearsonheDevStyle.prototype = {
		// Heredamos de pearsonhe los estilos del CKEditor
		parent: blink.theme.styles.pearsonhe.prototype,
		bodyClassName: 'content_type_clase_pearsonhedev',
		ckEditorStyles: {},
		slidesTitle: {},

		init: function () {
			// Utilizamos this.parent declarada al inicio de la clase para llamar al init de la misma.
			this.parent.init.call(this.parent, this);
        },

        //BK-15873 Tenemos que sobreescribir removeFinalSlide para que no se pierda la herencia de estilos
        removeFinalSlide: function () {
            //BK-15873 Utilizamos this.parent declarada al inicio de la clase
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

	pearsonheDevStyle.prototype = _.extend({}, new blink.theme.styles.pearsonhe(), pearsonheDevStyle.prototype);

    blink.theme.styles['pearsonhe-dev'] = pearsonheDevStyle;

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


// ████░██▄░▄██░████░████░████▄░██▄░██░░▄███▄░░██░░
// ██▄░░░▀███▀░░░██░░██▄░░██░██░███▄██░██▀░▀██░██░░
// ██▀░░░▄███▄░░░██░░██▀░░████▀░██▀███░███████░██░░
// ████░██▀░▀██░░██░░████░██░██░██░░██░██░░░██░████


var pearsonheApp = window.pearsonheApp || {};

pearsonheApp.courseData = '';
pearsonheApp.tags = {
	home : 'home',
	unithead : 'unit-head'
}

pearsonheApp.getCourseData = function() {

	loadJSON(function(json) {
		console.log(json);
		pearsonheApp.courseData = json;
		pearsonheApp.init();
	});

}

pearsonheApp.getTocInfo = function() {

	var data = pearsonheApp.courseData;

	$.each(data.units, function(i, unit) {
		var unitTitle = unit.title,
				unitDescription = unit.description,
				unitId = unit.id,
				unitTags = unit.tags,
				unitTagsArray = (typeof unitTags !== 'undefined') ? unitTags.split(" ") : [];

		var newHeader = '<div class="pearson-header"><h2 class="pearsonhe-title-1">'+unitTitle+'</h2><div class="pearsonhe-description">'+unitDescription+'</div></div>';

		var $currentUnit = $('#indice .unit-content[data-id="'+unitId+'"]');
		$currentUnit.find('.content').prepend(newHeader);

		if (unitTagsArray.length) {
			if (unitTagsArray.indexOf(pearsonheApp.tags.home) >= 0 ) {
				$currentUnit.addClass('pearsonhe-toc-home');
				$('#list-units li[data-id="'+unitId+'"]').addClass('pearsonhe-toc-home');
				$('#indice .unit-content[data-id="'+unitId+'"]').addClass('pearsonhe-toc-home-content');
			}

			if (unitTagsArray.indexOf(pearsonheApp.tags.unithead) >= 0 ) {
				console.log("Is unit head");
				$('#list-units li[data-id="'+unitId+'"]').addClass('pearsonhe-toc-unithead');
			}
		}


		$.each(unit.subunits, function(i, subunit) {

			var subunitTag = subunit.tags,
					subunitId = subunit.id;
			if (typeof subunitTag === 'undefined') subunitTag = 'self';
			$('#indice .unit-content .item[data-id="'+subunitId+'"]').addClass('pearsonhe-icon pearsonhe-icon-'+subunitTag);

		});
	});

}


// INIT

pearsonheApp.init = function() {

	pearsonheApp.getTocInfo();

}




$(document).ready(function() {

	pearsonheApp.getCourseData();

});
