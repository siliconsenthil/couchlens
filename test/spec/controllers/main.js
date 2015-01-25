'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('lensApp'));

  var MainCtrl,
    scope, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('should fetch database documents by document id', function () {
    scope.currentDb = 'workflow_service_docstore_dev';
    scope.docId = '18574c0d-c66c-4674-bc0b-34e62b4e55cb';
    var data = {_id: scope.docId, name: 'Complex wkfl', taskId: 'ROOT_TASK-c1a89453-158f-4f56-8579-8f57b655bdd6', docType: 'Workflow'};
    httpBackend.whenGET('http://localhost:5984/_all_dbs').respond(200, []);
    httpBackend.whenGET('http://localhost:5984/workflow_service_docstore_dev/_all_docs?include_docs=true').respond(200, {});
    httpBackend.flush();

    httpBackend.expectGET('http://localhost:5984/'+scope.currentDb+'/'+scope.docId).respond(200, data);

    scope.fetchByDocId();

    httpBackend.flush();

    expect(scope.document.name).toBe(data.name);
    expect(scope.noDocumentSelected).toBe(false);
    expect(scope.selectedDocType).toMatch([data.docType]);
  });

  it('should get only the selected document type if docId filter is applied', function () {
    scope.selectedDocType = 'Workflow';

    var docTypes = scope.getDocTypes();

    expect(docTypes).toMatch([scope.selectedDocType]);
  });

  it('should get all document types if docId filter is not applied', function () {
    scope.docTypes = ['Workflow','WorkflowTask'];

    var docTypes = scope.getDocTypes();

    expect(docTypes).toMatch(scope.docTypes);
  });

});
