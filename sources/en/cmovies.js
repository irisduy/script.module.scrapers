

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

source = {
  priority: 1,
  language: ['en'],
  domains: ['cmovieshd.net'],
  base_link: 'http://cmovieshd.net/',
  tv_link: 'https://cmovieshd.net/tv-series/',
  movie_link: 'https://cmovieshd.net/movie/',
  search_link: 'https://cmovieshd.net/search/?q='
};

var streamdor = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(libs, html, src, olod) {
    var episodeId, findEmbed;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            episodeId = html.match(/.*streamdor\.co\/video\/(\d+)/ig);

            if (episodeId) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:
            _context.next = 5;
            return libs.client.request('https://embed.streamdor.co/video/' + episodeId[0], 'GET', {}, { 'Referer': src });

          case 5:
            parserEpisode = _context.sent;

            parserEpisode = parserEpisode.match(/JuicyCodes\.Run\(([^\)]+)/i);
            parserEpisode = parserEpisode.replace(/\"\s*\+\s*\"/ig, '');
            parserEpisode = parserEpisode.replace(/[^A-Za-z0-9+\\/=]/i, '');
            parserEpisode = base64.decode(parserEpisode);
            parserEpisode = aes(parserEpisode);

            qual = parserEpisode.match(/label:"(.*?)"/i);

            if (qual) {
              qual = qual[0];
            } else {
              qual = 'SD';
            }

            findEmbed = parserEpisode.match(/(https\:\/\/streamango\.com\/embed\/.*?)/i);

            if (!findEmbed) {
              _context.next = 16;
              break;
            }

            return _context.abrupt('return', detail = {
              'source': 'streamango.com', 'quality': qual, 'language': 'en', 'url': findEmbed[0],
              'info': '', direct: false, 'debridonly': False
            });

          case 16:
            if (!olod) {
              _context.next = 18;
              break;
            }

            return _context.abrupt('return', {
              'source': 'openload.co', 'quality': qual, 'language': 'en', 'url': findEmbed[0],
              'info': '', direct: false, 'debridonly': False
            });

          case 18:
            return _context.abrupt('return', false);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function streamdor(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

getSource = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return');

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getSource(_x5) {
    return _ref2.apply(this, arguments);
  };
}();
movie = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(libs, infoMovie, listDirect, getDirect, callback) {
    var movieLink, listLink, searchLink, parser, listItem, listEps, arrPromise;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            movieLink = '';
            listLink = [];
            searchLink = source.search_link + infoMovie.title + "+" + infoMovie.year;
            _context4.next = 6;
            return libs.client.request(searchLink, 'GET', {}, {}, false, '', '', '', 'dom');

          case 6:
            parser = _context4.sent;

            if (parser) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt('return');

          case 9:
            listItem = parser('a.ml-mask');


            listItem.each(function () {

              var title = parser(this).attr('title');

              if (title.toLowerCase() == infoMovie.title.toLowerCase() || title.toLowerCase() == infoMovie.title.toLowerCase() + " " + infoMovie.year) {
                movieLink = parse(this).attr('href');
              }
            });

            if (!(movieLink == '')) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt('return');

          case 13:
            _context4.next = 15;
            return libs.client.request(movieLink + "watch", 'GET', {}, {}, false, '', '', '', 'dom');

          case 15:
            parser = _context4.sent;

            if (parser) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt('return');

          case 18:
            listEps = parser('.btn-eps');


            listEps.each(function () {
              listLinks.push(parser(this).attr('href'));
            });

            arrPromise = listLinks.map(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
                var parserEmbed, openloadLink, embed, _embed;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        parserEmbed = libs.client.request(item, 'GET');

                        if (!parseEmbed.match(/http.+:\/\/openload\.co\/embed\/.+\"/ig)) {
                          _context3.next = 10;
                          break;
                        }

                        openloadLink = parseEmbed.match(/http.+:\/\/openload.co\/embed\/.+\"/ig);

                        if (!openloadLink) {
                          _context3.next = 8;
                          break;
                        }

                        _context3.next = 6;
                        return streamdor(libs, trim(openloadLink[0]), item, true);

                      case 6:
                        embed = _context3.sent;

                        if (embed) {

                          getDirect(embed, listDirect, callback);
                        }

                      case 8:
                        _context3.next = 14;
                        break;

                      case 10:
                        _context3.next = 12;
                        return streamdor(libs, parserEmbed, item, false);

                      case 12:
                        _embed = _context3.sent;


                        if (_embed) {

                          getDirect(_embed, listDirect, callback);
                        }

                      case 14:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x11) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context4.next = 23;
            return Promise.all(arrPromise);

          case 23:
            return _context4.abrupt('return');

          case 26:
            _context4.prev = 26;
            _context4.t0 = _context4['catch'](0);
            return _context4.abrupt('return');

          case 29:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 26]]);
  }));

  return function movie(_x6, _x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();
tvshow = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(libs, infoMovie, listDirect, getDirect, callback) {
    var tvshowLink, episodeLink, searchText, parser, listItem, listEps, arrPromise;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            tvshowLink = '';
            episodeLink = [];
            searchText = infoMovie.title + ' season ' + infoMovie.season;
            _context6.next = 6;
            return libs.client.request(source.search_link + searchText, 'GET', {}, {}, false, '', '', '', 'dom');

          case 6:
            parser = _context6.sent;
            listItem = parser('.ml-item');


            listItem.each(function () {

              var title = parser(this).attr('title');

              if (title && title.toLowerCase().replace(/\W+/ig, '') == (infoMovie.title + " - season " + infoMovie.season).toLowerCase().replace(/\W+/ig, '')) {
                tvshowLink = parser(this).attr('href');
              }
            });

            if (tvshowLink) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt('return');

          case 11:

            parser = libs.client.request(tvshowLink + 'watch', 'GET', {}, {}, false, '', '', '', 'dom');
            listEps = parser('.btn-eps');


            listEps.each(function () {
              var eps = parser(this).text;
              eps = exps.match(/episode *([0-9]+)/i);

              if (eps && eps == infoMovie.episode) {
                episodeLink.push(parser(this).attr('href'));
              }
            });

            arrPromise = episodeLink.map(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
                var openloadLink, embed, _embed2;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        parserEmbed = libs.client.request(item, 'GET');

                        if (!parseEmbed.match(/http.+:\/\/openload\.co\/embed\/.+\"/ig)) {
                          _context5.next = 10;
                          break;
                        }

                        openloadLink = parseEmbed.match(/http.+:\/\/openload.co\/embed\/.+\"/ig);

                        if (!openloadLink) {
                          _context5.next = 8;
                          break;
                        }

                        _context5.next = 6;
                        return streamdor(libs, trim(openloadLink[0]), item, true);

                      case 6:
                        embed = _context5.sent;

                        if (embed) {

                          getDirect(embed, listDirect, callback);
                        }

                      case 8:
                        _context5.next = 14;
                        break;

                      case 10:
                        _context5.next = 12;
                        return streamdor(libs, parserEmbed, item, false);

                      case 12:
                        _embed2 = _context5.sent;


                        if (_embed2) {

                          getDirect(_embed2, listDirect, callback);
                        }

                      case 14:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, this);
              }));

              return function (_x17) {
                return _ref6.apply(this, arguments);
              };
            }());
            _context6.next = 21;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6['catch'](0);

            console.log(String(_context6.t0));
            return _context6.abrupt('return');

          case 21:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 17]]);
  }));

  return function tvshow(_x12, _x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();