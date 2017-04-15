'use strict';

angular.module('core').provider('SectionFilters',
  function () {

    var allFilters = {},
      id = 0;

    return {

      register: function (sectionName, config) {
        allFilters[sectionName] = _.map(config.filters, function (filter) {
          return _.assign(filter, {
            _id: ++id,
            default: true,
            templateUrl: config.templateUrl
          });
        });
      },

      $get: function ($window, Schema) {

        function getLastSelectedFilters() {
          return JSON.parse($window.localStorage.getItem('selected-section-filters') ||  '{}');
        }

        var Config = new Schema('config');

        var configs = {};

        function SectionFilter(params) {
          _.assign(this, params);
        }

        SectionFilter.prototype.save = function () {
          var filter = _.pick(this, ['_id', 'title', 'query']),
            config = configs[this.sectionName],
            index = _.findIndex(config.data.filters, ['_id', filter._id]);

          if (index === -1) {
            config.data.filters.push(filter);
          } else {
            config.data.filters.splice(index, 1, filter);
          }
          return config.save();
        };

        SectionFilter.prototype.remove = function () {
          var config = configs[this.sectionName];
          _.remove(config.data.filters, {
            _id: this._id
          });
          return config.save();
        };

        return {

          getFilters: function (sectionName) {
            var configName = 'sectionFilters' + sectionName;
            return Config.findOne({
              name: configName
            }).then(function (config) {

              function returnFilters(config) {
                configs[sectionName] = config;

                return _.orderBy(_.map(allFilters[sectionName].concat(config.data.filters), function (filter) {
                  return new SectionFilter(_.assign(filter, {
                    title: _.startCase(_.toLower(filter.title)),
                    sectionName: sectionName,
                    templateUrl: _.first(allFilters[sectionName]).templateUrl
                  }));
                }), 'title');
              }

              if (_.isNull(config)) {
                return Config.create({
                  name: configName,
                  data: {
                    filters: []
                  }
                }).then(returnFilters);
              }

              return returnFilters(config);
            });
          },

          getSelectedFilter: function (sectionName) {
            return this.getFilters(sectionName).then(function (filters) {
              var lastSelectedFilters = getLastSelectedFilters(),
                lastSelectedFilter = _.find(filters, ['_id', lastSelectedFilters[sectionName]]);

              if (_.isUndefined(lastSelectedFilter)) {
                lastSelectedFilter = _.first(filters);
                this.setSelectedFilter(sectionName, lastSelectedFilter);
              }

              return lastSelectedFilter;
            }.bind(this));
          },

          setSelectedFilter: function (sectionName, filter) {
            var lastSelectedFilters = getLastSelectedFilters();
            lastSelectedFilters[sectionName] = filter._id;
            $window.localStorage.setItem('selected-section-filters', JSON.stringify(lastSelectedFilters));
          },

          getNewFilter: function (sectionName) {
            return new SectionFilter(_.assign({}, _.first(allFilters[sectionName]), {
              title: 'Nouveau groupe',
              default: false,
              _id: ++id
            }));
          }

        };

      }
    };

  });
