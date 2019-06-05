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
		ckEditorStyles: {
			name: 'Pearsonhe-dev',
			styles: [
				{ name: 'Title 1', element: 'h4', attributes: { 'class': 'bck-title1'} },
				{ name: 'Title 2', element: 'h4', attributes: { 'class': 'bck-title2'} },
				{ name: 'Title 3', element: 'h4', attributes: { 'class': 'bck-title3'} },
				{ name: 'Title 4', element: 'h4', attributes: { 'class': 'bck-title4'} },
				{ name: 'Title 5', element: 'h4', attributes: { 'class': 'bck-title5'} },
				{ name: 'Title 6', element: 'h4', attributes: { 'class': 'bck-title6'} },
				{ name: 'Title 7', element: 'h4', attributes: { 'class': 'bck-title7'} },
				{ name: 'Title 8', element: 'h4', attributes: { 'class': 'bck-title8'} },
				{ name: 'Title 9', element: 'h4', attributes: { 'class': 'bck-title9'} },
				{ name: 'Title 10',element: 'h4', attributes: { 'class': 'bck-title10'} },
				{ name: 'Title 11', element: 'h4', attributes: { 'class': 'bck-title11'} },
				{ name: 'Title 12',element: 'h4', attributes: { 'class': 'bck-title12'} },
				{ name: 'Énfasis', element: 'span', attributes: { 'class': 'bck-enfasis' }},
				{ name: 'Table', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} },
				{ name: 'Cell 1', element: 'td', attributes: { 'class': 'bck-td' } },
				{ name: 'Cell 2', element: 'td', attributes: { 'class': 'bck-td-2' } },
				{ name: 'List 1', element: 'ol', attributes: { 'class': 'bck-ol' } },
				{ name: 'List 2', element: 'ol', attributes: { 'class': 'bck-ol-2' } },
				{ name: 'List 3', element: 'ol', attributes: { 'class': 'bck-ol-3' } },
				{ name: 'List 4', element: 'ol', attributes: { 'class': 'bck-ol-4' } },
				{ name: 'List 5', element: 'ol', attributes: { 'class': 'bck-ol-5' } },
				{ name: 'List 6', element: 'ol', attributes: { 'class': 'bck-ol-6' } },
				{ name: 'List 7', element: 'ol', attributes: { 'class': 'bck-ol-7' } },
				{ name: 'Bulleted list 1', element: 'ul', attributes: { 'class': 'bck-ul'} },
				{ name: 'Bulleted list 2', element: 'ul', attributes: { 'class': 'bck-ul-2'} },
				{ name: 'Bulleted list 3', element: 'ul', attributes: { 'class': 'bck-ul-3'} },
				{ name: 'Box 1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-1' } },
				{ name: 'Box 2 ', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-2' } },
				{ name: 'Box 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-3' } },
				{ name: 'Box 4', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-4' } },
				{ name: 'Box 5', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-5' } },
				{ name: 'Box 6', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-6' } },
				{ name: 'Box 7', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-7' } },
				{ name: 'Box 8', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-8' } },
				{ name: 'Box 9', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-9' } },
				{ name: 'Box 10', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-10' } },
				{ name: 'Box 11', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-11' } },
				{ name: 'Box 12', type: 'widget', widget: 'blink_box', attributes: { 'class': 'box-12' } }
			]
		},
		slidesTitle: {},

		init: function (scope) {
			// Utilizamos this.parent declarada al inicio de la clase para llamar al init de la misma.
			var that = scope || this;
			this.parent.init.call(that);
						this.addActivityTitle();
						that.getActualUnitActivities();
						blink.events.on("course_loaded", function(){
				that.formatCarouselindicators();
			});
			that.addSlideNavigators();

		},
		removeFinalSlide: function (scope) {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			var that = scope || this;
			this.parent.removeFinalSlide.call(that, true);
		},
		loadUserData: function () {
			var urlSeguimiento = '/include/javascript/seguimientoCurso.js.php?idcurso=' + idcurso;
			loadScript(urlSeguimiento, true, (function (data) {
				window.actividades = actividades;
			}).bind(this));
		},
		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			var $navbarTitle = $('.navbar.libro').find('span.title');
			$navbarTitle.css('display', 'inline-block');
			$navbarTitle.html(blink.courseInfo.unit + ' > ' + blink.courseInfo.lesson);
        },

        /**
		 * @summary Gets the activity type subunits of the actual unit.
		 * @return {Object} Object of the actual unit filtering the not activity type subunits
		 */
		getActualUnitActivities: function () {
			var curso = blink.getCourse(idcurso),
				that = this,
				units,
				unitSubunits,
				actualActivity,
				unitActivities = [];

			curso.done(function () {
				units = curso.responseJSON.units;

				$.each(units, function () {
					if (this.id && this.id == blink.courseInfo.IDUnit) {
						unitSubunits = this.subunits.concat(this.resources);
					}
				});

				actualActivity = _.find(unitSubunits, function(subunit) {
					return subunit.id == idclase;
				});

				if (typeof actualActivity !== "undefined" && actualActivity.level == '6') {
					unitActivities.push(actualActivity);
				} else {
					unitActivities = _.filter(unitSubunits, function(subunit) {
						return subunit.type == 'actividad' && subunit.level !== '6';
					});
				}

                that.subunits = unitActivities;
                pearsonheApp.customBookIndex(curso.responseJSON);
			}).done(function(){
				blink.events.trigger('course_loaded');
			});
		},

        /**
		 * @summary Getting active slide position in relation with the total of the
		 *          unit slides.
		 * @param {Array} $subunits Array of activity type objects
		 * @return {int} Slide position
		 */
		getActualSlideNumber: function (subunits) {
			var actualSlideIndex = $('.swipeview-active').attr('data-page-index'),
				actualSlide = 1;

			for (var i in subunits) {
				if (subunits[i].id && parseInt(subunits[i].id) != idclase) {
					actualSlide += parseInt(subunits[i].pags);
				} else {
					actualSlide += parseInt(actualSlideIndex);
					break;
				}
			}

			return actualSlide;
		},
        formatCarouselindicators: function (scope, classNavbar) {
			var that = scope || this,
				navbar = ((typeof classNavbar !== "undefined" && !classNavbar)?classNavbar:'pearsonhe-navbar'),
				$navbarBottom = $('.navbar-bottom'),
				firstSlide = eval('t0_slide');
			if(blink.courseInfo && blink.courseInfo.courseDateCreated) var courseYearCreated = new Date(blink.courseInfo.courseDateCreated).getFullYear();
			var yearCopy = courseYearCreated !== undefined ? courseYearCreated : 2019;
			$navbarBottom
				.attr('class', navbar)
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before('<span class="copyright">&copy;' +  yearCopy + '</span>')
					.wrap('<div id="top-navigator"/>')
					.remove()
					.end();

			$('#volverAlIndice').click(function() {
				return showCursoCommit();
			});

			var subunits = that.subunits,
				totalSlides = 0,
				subunit_index,
				subunit_pags;

			// Different behaviour depending on whether the slides are accessed from
			// a book or from a homework link or similar
			if (subunits.length !== 0) {
				for (var i in subunits) {
					if (subunits[i].pags) {
						var subunitSlides = parseInt(subunits[i].pags);
						totalSlides += subunitSlides;
					}
					if (subunits[i].id && subunits[i].id == idclase) {
						subunit_index = i;
						subunit_pags = parseInt(subunits[i].pags);
					}
				}

				that.totalSlides = totalSlides;

				$('#top-navigator').append('<span class="left slider-navigator">' +
						'<span class="fa fa-chevron-left"></span>' +
					'</span>' +
					'<span class="slide-counter" data-subunit-index="' + subunit_index +
						'" data-subunit-pags="' + subunit_pags + '">' +
						that.getActualSlideNumber(subunits) + ' / ' + totalSlides +
					'</span>' +
					'<span class="right slider-navigator">' +
						'<span class="fa fa-chevron-right"></span>' +
					'</span>');

				blink.events.on('section:shown', function() {
					$('.slide-counter').html(that.getActualSlideNumber(subunits) +
						' / ' + totalSlides);
				});
			} else {
				$('#top-navigator').append('<span class="left slider-navigator">' +
						'<span class="fa fa-chevron-left"></span>' +
					'</span>' +
					'<span class="slide-counter">' + (window.activeSlide + 1) +
						' / ' + window.secuencia.length +
					'</span>' +
					'<span class="right slider-navigator">' +
						'<span class="fa fa-chevron-right"></span>' +
					'</span>');

				blink.events.on('section:shown', function() {
					$('.slide-counter').html((window.activeSlide + 1) +
						' / ' + window.secuencia.length);
					$('.bck-dropdown-2').hideBlink();
				});
			}

			blink.events.on('section:shown', function() {
				var sectionTitle = eval('t' + blink.activity.getFirstSlideIndex(window.activeSlide) +
					'_slide').title;
				$navbarBottom.find('.sectionTitle').text(sectionTitle);
			});

			if (firstSlide.seccion) {
				$navbarBottom.addClass('first-is-section');
			}

			blink.events.trigger(true, 'style:endFormatCarousel');
        },

		addSlideNavigators: function () {
			var that = this;
			blink.events.on("course_loaded", function(){

				var that = blink.activity.currentStyle,
					subunit_index = parseInt($('.slide-counter').attr('data-subunit-index')),
					level_six = that.subunits.length == 1 && that.subunits[0].level == 6;

				$('.slider-control').off('click');

				// Navigation change depending on whether the slides are accessed from
				// a book or from a homework link or similar
				if (that.subunits.length !== 0 && !level_six) {
					// Slider controls must allow navigation among all the activity subunits
					// in the current unit.

					$('.left.slider-control, .left.slider-navigator').click(function () {
						if (!$(this).hasClass('disabled')) {
							if(activeSlide == 0) {
								redireccionar('/coursePlayer/clases2.php?editar=0&idcurso=' +
									idcurso + '&idclase=' + that.subunits[subunit_index - 1].id + '&modo=0&numSec=' +
									that.subunits[subunit_index - 1].numSlides, false, undefined);
							} else {
								blink.activity.showPrevSection();
							}
						}
					});
					$('.right.slider-control, .right.slider-navigator').click(function () {
						if (!$(this).hasClass('disabled')) {
							if(activeSlide == parseInt(that.subunits[subunit_index].pags) - 1) {
								redireccionar('/coursePlayer/clases2.php?editar=0&idcurso=' +
									idcurso + '&idclase=' + that.subunits[subunit_index + 1].id + '&modo=0' + ((typeof window.esPopup !== "undefined" && window.esPopup)?"&popup=1":""),
									false, undefined);
							} else {
								blink.activity.showNextSection();
							}
						}
					});
				} else {
					$('.left.slider-control, .left.slider-navigator').click(function () {
						blink.activity.showPrevSection();
					});
					$('.right.slider-control, .right.slider-navigator').click(function () {
						blink.activity.showNextSection();
					});
				}

				$(document).ready(function() {
					blink.events.on('showSlide:after', function() {
						that.enableSliders();
					});
				});
			});
		},

		/**
		 * @summary Enables all slider controls and disables when appropiate
		 */
		enableSliders: function () {
			// Removes disabled class to all navigation buttons and applies
			// just if its first or last slide of all activities
			$('.slider-control, .slider-navigator').removeClass('disabled');
			var that = blink.activity.currentStyle,
				subunit_index = parseInt($('.slide-counter').attr('data-subunit-index')),
				level_six = this.subunits.length == 1 && this.subunits[0].level == 6;

			// Navigation change depending on whether the slides are accessed from
			// a book or from a homework link or similar
			if (this.subunits.length !== 0 && modoVisualizacionLabel != "standalone") {
				if (this.getActualSlideNumber(this.subunits) == 1) {
					$('.slider-control.left, .slider-navigator.left').addClass('disabled');
				}
				if (this.getActualSlideNumber(this.subunits) == this.totalSlides && !level_six) {
					$('.slider-control.right, .slider-navigator.right').addClass('disabled');
				}
			} else {
				if (window.activeSlide == 0) {
					$('.slider-control.left, .slider-navigator.left').addClass('disabled');
				}
				if(window.activeSlide == parseInt(that.subunits[subunit_index].pags) - 1 && !level_six){
					$('.slider-control.right, .slider-navigator.right').addClass('disabled');
				}
			}
		},
		showBookIndexInClass: function () {
			return modoVisualizacionLabel != "standalone";
		},
        habilitarTemas: function(){

			var $temas = $(".js-indice-tema");
            $temas.removeClass("disabled locked");
            $temas.each(function(){

				var id_tema = $(this).attr("data-id");
				var selector_accesos = ".unit-content[data-id='" + id_tema + "'] .js-list-activities li .item-containment .acceso";

				var t_actividades_abiertas = $(selector_accesos + ".invisible").length;
                var t_accesos = $(selector_accesos).length;

                var el_tema = $("#tema" + id_tema);

                if(el_tema.hasClass("pearsonhe-toc-unithead")){
                    var c_temas_incluidos = 0;
                    $temas.each(function(){
                        if($(this).attr("data-id") != id_tema){
                            if(!$(this).hasClass("pearsonhe-toc-unithead")){
                                c_temas_incluidos++;
                            }else{
                                c_temas_incluidos = 0;
                            }
                        }
                    });
                    if(c_temas_incluidos === 0 && c_temas_incluidos !== undefined){
                        el_tema.removeClass("locked");
                    }else{
                        el_tema.addClass("locked");
                    }
                }else if(t_actividades_abiertas > 0){
                    el_tema.removeClass("locked");
                }else{
                    el_tema.addClass("locked");
                }
                if(t_accesos <= 0){
                    el_tema.addClass("locked");
                }else{
                    el_tema.removeClass("locked");
                }

            });
        }
	};

	pearsonheDevStyle.prototype = _.extend({}, new blink.theme.styles.pearsonhe(), pearsonheDevStyle.prototype);

	blink.theme.styles['pearsonhe-dev'] = pearsonheDevStyle;

	blink.events.on('digitalbook:bpdfloaded', function() {
		blink.getCourse(idcurso).done(function(response) {
			var unit = _.findWhere(response.units, {id: idtema.toString()}),
				subunit = _.findWhere(unit.subunits, {id: window.idclase.toString()}),
            	title = unit.title.replace(/(<([^>]+)>)/ig,""),
            	subunitTitle = subunit.title.replace(/(<([^>]+)>)/ig,""),
            	$navbarTitle = $('.navbar.libro').find('span.title');
			$navbarTitle.html(title + ' > ' + subunitTitle);
		});
	});

	// Remove Info
	blink.events.on('indexLoaded', function () {
		pearsonheApp.customBookIndex();
	});

})(blink);


$(function () {
	loadJSON(function (json) {
		// console.log(json);
	})
});
/**
 * loadJSON Ejecuta una llamada asíncrona dependiendo del entorno para obtener el cursoJSON
 * @param  	function 	callback 	Función de callback del ajax.
 * @return 	boolean		False en caso de que no haya callback.
 */
function loadJSON(callback) {
	if (!callback && typeof callback === 'undefined') {
		return false;
	}

	var isBlink = (window.location.href.indexOf("blinklearning.com") > -1);

	if (isBlink) { //online
		blink.getCourse(window.idcurso).done(callback);
	} else { //local
		var url = window.location.href.replace("curso2", "curso_json");

		if (offline) {
			if (url.indexOf("curso_json") > -1) {
				url = removeParams(['idtema', 'idalumno'], url);
			}
		}

		$.ajax({
			url: url,
			dataType: 'json',
			beforeSend: function (xhr) {
				if (xhr.overrideMimeType) xhr.overrideMimeType("application/json");
			},
			success: callback
		});
	}
}

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
		$currentParent
			.addClass('pearsonhe-toc-subunit-active')
			.prevUntil('.pearsonhe-toc-unithead', 'li')
				.addClass('pearsonhe-toc-subunit-active')
				.end()
			.nextUntil('.pearsonhe-toc-unithead', 'li')
				.addClass('pearsonhe-toc-subunit-active');
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
