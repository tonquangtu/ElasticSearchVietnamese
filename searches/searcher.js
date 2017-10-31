const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

exports.ping = () => {
  client.ping({
    requestTimeout: 1000,
  }, (err) => {
    if (err) {
      console.log('Elasticsearch cluster is down');
    } else {
      console.log('All is well');
    }
  });
};

exports.indexExists = (indexName) => {
  console.log('indexExists');
  return client.indices.exists({
    index: indexName
  });
};

exports.deleteIndex = (indexName) => {
  console.log('deleteIndex');
  return client.indices.delete({
    index: indexName
  });
};

exports.createIndex = (indexName) => {
  console.log('createIndex');
  const options = {
    settings: {
      index: {
        number_of_shards: 1,
        number_of_replicas: 1,
        analysis: {
          analyzer: {
            my_analyzer: {
              type: 'custom',
              tokenizer: 'vi_tokenizer',
              char_filter: ['html_strip'],
              filter: ['icu_folding']
            }
          }
        }
      }
    },
    mappings: {
      blogs: {
        properties: {
          author: {
            type: 'text',
            analyzer: 'vi_analyzer'
          },
          content: {
            type: 'text',
            analyzer: 'vi_analyzer'
          }
        }
      }
    }
  };

  const params = {
    index: indexName,
    body: options
  };

  return client.indices.create(params);
};


exports.addDocument = (indexName, type, document, callback) => {
  console.log('addDocument');
  client.index({
    index: indexName,
    type: type,
    body: document
  }, (err, res) => {
    if (err){
      console.log(err);
    }
    callback();
  });
};

exports.simpleSearch = (params) => {
  const {
    indexName,
    type,
    keyword,
    analyzer
  } = params;

  const searchQuery = {
    index: indexName,
    type: type,
    body: {
      query: {
        match: {
          content: {
            query: keyword,
            analyzer: analyzer
          }
        }
      },
      highlight: {
        fields: {
          content: {
            fragment_size: 150,
            number_of_fragments: 3
          }
        }
      }
    }
  };

  return client.search(searchQuery);
};