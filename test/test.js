import assert from 'assert';

describe( 'String Test', function() {
  
  it( 'hello, world test', function() {
    assert.equal( 'hello, world', 'hello, world' );
    assert.notEqual( 'hello, world', 'world, hello' );
  }); 
});
