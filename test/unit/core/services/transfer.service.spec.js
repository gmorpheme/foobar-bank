// 'use strict';

// describe('The TransferSrv Service', function() {

//   var TransferSrv
//   var UserSrv; 
//   var $httpBackend;

//   beforeEach(module('boilerplate'));

//   beforeEach(inject(function(_TransferSrv_,  _$httpBackend_, _UserSrv_) {
//     TransferSrv = _TransferSrv_;
//     $httpBackend = _$httpBackend_;
//     UserSrv = _UserSrv_;

//     $httpBackend.expectGET('/api/session//transfer/').respond(403);
//     $httpBackend.expectGET('/api/session/1234/transfer/').respond(200, {
//       foo: 'bar'
//     });
//   }));

//   it('should redirect when there is no session', function() {
//     TransferSrv.get().then(function() {}, function() {
//       expect(arguments.length).toBe(1);
//     });
//   });

//   it('should redirect when there is no session', function() {
//     UserSrv.setSession('1234');
//     TransferSrv.get().then(function(data) {
//       expect(data.data.foo).toBe('bar');
//     });
//   });

//   afterEach(function() {
//     $httpBackend.flush();
//   });

// });