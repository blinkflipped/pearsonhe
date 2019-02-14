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
				pearsonheApp.customBookIndex();
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
	unithead : 'unit_head'
}

pearsonheApp.text = {
  menu : 'Menu'
}

pearsonheApp.getCourseData = function() {

	loadJSON(function(json) {
		console.log(json);
		pearsonheApp.courseData = json;
		pearsonheApp.init();
	});

}

pearsonheApp.customBookIndex = function() {

	var data = pearsonheApp.courseData;

	var newBookIndexHeader = '<div class="pearsonhe-bookindex-header"><h2 class="pearsonhe-title-1">'+pearsonheApp.text.menu+'</h2></div>';
	var headerExists = $('#book-index #wrapper .pearsonhe-bookindex-header').length;

	if (!headerExists) $('#book-index #wrapper').prepend(newBookIndexHeader);

	$.each(data.units, function(i, unit) {
		var unitId = unit.id,
				unitTags = unit.tags,
				unitTagsArray = (typeof unitTags !== 'undefined') ? unitTags.split(" ") : [];


		var $listUnitsItem = $('#list-units li[data-id="'+unitId+'"]');

		if (unitTagsArray.length) {
			if (unitTagsArray.indexOf(pearsonheApp.tags.home) >= 0 ) {
				$listUnitsItem.hide();
			}

			if (unitTagsArray.indexOf(pearsonheApp.tags.unithead) >= 0 ) {
				$listUnitsItem.addClass('pearsonhe-toc-unithead');
				if ($listUnitsItem.prevAll('li').first().hasClass('pearsonhe-toc-unithead')) {
					$listUnitsItem.prevAll('li').first().addClass('pearsonhe-toc-unithead_empty');
				}
				if (!$listUnitsItem.nextAll('li').length) {
					$listUnitsItem.addClass('pearsonhe-toc-unithead_empty');
				}
			}
		}
	});

	$('#list-units li.pearsonhe-toc-unithead.disabled').each(function(i,e) {
		if ($(e).nextAll('li').first().hasClass('pearsonhe-toc-unithead') || !$(e).nextAll('li').length) {
			$(e).addClass('pearsonhe-toc-unithead_empty');
		} else {
			$(e).removeClass('disabled locked').addClass('pearsonhe-toc-disabled');
		}
	});

	if (!$('#list-units li.pearsonhe-toc-unithead').length) {
		$('#list-units li').addClass('pearsonhe-toc-subunit-active pearsonhe-toc-subunit-woparent');
	}
	if ($('#list-units li.pearsonhe-toc-unithead').first().prevAll('li:not(.pearsonhe-toc-home)').length) {
		$('#list-units li.pearsonhe-toc-unithead').first().prevAll('li:not(.pearsonhe-toc-home)').addClass('pearsonhe-toc-subunit-active pearsonhe-toc-subunit-woparent');
	}

	var $currentParent = $('#book-index .current-parent');
	if (!$currentParent.hasClass('pearsonhe-toc-unithead')) {
		$currentParent.addClass('pearsonhe-toc-subunit-active').prevUntil('.pearsonhe-toc-unithead', 'li').addClass('pearsonhe-toc-subunit-active');
	} else {
		$currentParent.addClass('pearsonhe-toc-active').nextUntil('.pearsonhe-toc-unithead', 'li').addClass('pearsonhe-toc-subunit-active');
	}


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

		var $currentListUnit = $('#list-units li[data-id="'+unitId+'"]');

		if (unitTagsArray.length) {
			if (unitTagsArray.indexOf(pearsonheApp.tags.home) >= 0 ) {
				$currentUnit.addClass('pearsonhe-toc-home pearsonhe-toc-home-content');
				$currentListUnit.addClass('pearsonhe-toc-home');
			}

			if (unitTagsArray.indexOf(pearsonheApp.tags.unithead) >= 0 ) {
				$currentListUnit.addClass('pearsonhe-toc-unithead');
				if ($currentListUnit.prevAll('li').first().hasClass('pearsonhe-toc-unithead')) {
					$currentListUnit.prevAll('li').first().addClass('pearsonhe-toc-unithead_empty');
				}
				if (!$currentListUnit.nextAll('li').length) {
					$currentListUnit.addClass('pearsonhe-toc-unithead_empty');
				}
			}
		}

		$.each(unit.subunits, function(i, subunit) {

			var subunitTag = subunit.tags,
					subunitId = subunit.id;
			if (typeof subunitTag === 'undefined') subunitTag = 'self';
			$('#indice .unit-content .item[data-id="'+subunitId+'"]').addClass('pearsonhe-icon pearsonhe-icon-'+subunitTag);

		});
	});

	var $current = $('#list-units .litema.active');
	$current.addClass('pearsonhe-toc-active').nextUntil('.pearsonhe-toc-unithead', 'li').addClass('pearsonhe-toc-subunit-active');

	if (!$current.hasClass('pearsonhe-toc-unithead')){
		$current.addClass('pearsonhe-toc-subunit-active').prevUntil('.pearsonhe-toc-unithead', 'li').addClass('pearsonhe-toc-subunit-active').prevAll('.pearsonhe-toc-unithead').first().addClass('pearsonhe-toc-unithead-ancestor');
	} else {
		$current.addClass('pearsonhe-toc-unithead-ancestor');
	}

	if (!$('#list-units li.pearsonhe-toc-unithead').length) {
		$('#list-units li').addClass('pearsonhe-toc-subunit-active pearsonhe-toc-subunit-woparent');
	}
	if ($('#list-units li.pearsonhe-toc-unithead').first().prevAll('li:not(.pearsonhe-toc-home)').length) {
		$('#list-units li.pearsonhe-toc-unithead').first().prevAll('li:not(.pearsonhe-toc-home)').addClass('pearsonhe-toc-subunit-active pearsonhe-toc-subunit-woparent');
	}
}


// INIT

pearsonheApp.init = function() {

	pearsonheApp.getTocInfo();

}


$(document).ready(function() {

	pearsonheApp.getCourseData();


	$('body').on('click', '#list-units .js-indice-tema', function() {

		if (!$(this).hasClass('pearsonhe-toc-unithead')) {
			$(this).prevAll('li.pearsonhe-toc-unithead').first().addClass('pearsonhe-toc-unithead-ancestor');
		} else {
			var $sublevels = $(this).nextUntil('.pearsonhe-toc-unithead', 'li');
			if ($(this).hasClass('pearsonhe-toc-active')) {
				if ($sublevels.first().hasClass('pearsonhe-toc-subunit-active')) {
					$(this).removeClass('pearsonhe-toc-unithead-ancestor');
				} else {
					$(this).addClass('pearsonhe-toc-unithead-ancestor');
				}
				$sublevels.toggleClass('pearsonhe-toc-subunit-active');
			} else {
				$(this).addClass('pearsonhe-toc-unithead-ancestor');
				$sublevels.addClass('pearsonhe-toc-subunit-active');
			}
		}
		if ($(this).hasClass('pearsonhe-toc-disabled')) {
			$('#book-index .col-main').addClass('pearsonhe-hidden');
		} else {
			$('#book-index .col-main').removeClass('pearsonhe-hidden');

		}
		$(this).siblings('li').removeClass('pearsonhe-toc-active').end().addClass('pearsonhe-toc-active');
	});


});
