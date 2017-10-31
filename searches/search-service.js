const async = require('async');
const searcher = require('./searcher');
const helpers = require('../helpers/helpers');

// const blogs = blogsFaker();
let blogs = [];
let index = 0;
const indexName = 'demo_es_vn';
const type = 'blogs';


exports.fakeData = (callback) => {

  searcher
    .indexExists(indexName)
    .then((exists) => {
      if (exists) {
        return searcher.deleteIndex(indexName);
      }
      return null;
    })
    .then(() => {
      return searcher.createIndex(indexName);
    })
    .then(() => {
      helpers.getDumbData((blogsFromDumbData) => {
        blogs = blogsFromDumbData;
        handleAddDocuments(callback);
      });

      return null;
    })
    .catch((err) => {
      console.log(err);
    })
};

exports.vnSearch = (keyword, callback) => {
  const searchParams = {
    indexName: indexName,
    type: type,
    keyword: keyword,
    analyzer: 'vi_analyzer',
  };

  search(searchParams, callback);
};

exports.standardSearch = (keyword, callback) => {
  const searchParams = {
    indexName: indexName,
    type: type,
    keyword: keyword,
    analyzer: 'standard',
  };

  search(searchParams, callback);
};


function search(searchParams, callback) {
  searcher
    .simpleSearch(searchParams)
    .then((results) => {
      callback(results);
    })
    .catch((err) => {
      console.log(err);
    });
}


function addDocument(callback) {
  index = index + 1;
  searcher.addDocument(indexName, type, blogs[index -1], callback);
}

function handleAddDocuments(callback) {
  const arrCallsAdd = [];
  const length = blogs.length;

  for (let i = 0; i < length; i++) {
    arrCallsAdd.push(addDocument);
  }

  async.series(arrCallsAdd, (err, results) => {
    if (err) {
      console.log(err);
    }
    callback();
  });

}


function blogsFaker() {
  const blogs = [
    {
      author: 'Tôn Quang Từ',
      content: 'Chuyện kể ngày xưa rằng có 5 thầy trò Đường Tăng vượt tám vạn sáu nghìn bốn trăm dặm để tìm kiếm được chân kinh đem về phổ cập cho chúng sinh muôn loài',
    },
    {
      author: 'Nguyễn Thanh Tùng',
      content: 'Năm thầy trò đường tăng vượt bao muôn khổ, trải qua 82 kiếp nạn mới có thể tới được Tây Thiên để thỉnh kinh',
    },
    {
      author: 'Nguyễn Ngọc Trung',
      content: 'Đường Tăng nghe vậy nên sau khi thỉnh được kinh liền cấp tốc đem về Đông Thổ Đại Đàng để phổ cập lũ trẻ trâu tại sứ',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Do bộ chân kinh là quá nhiều, quá đồ sộ, Đường Tăng lại tuổi cao sức yếu không thể nhớ được hết và khó có khả năng để tìm kiếm ra các phần cụ thể bộ chân kinh kỳ vĩ này',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Ông ấy chỉ nhớ sơ sơ được một số từ trong bộ, việc lật ra tìm kiếm từng trang là bất khả thi do bộ chân kinh là quá đồ sộ',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Thời lúc ấy đại đệ tử của Đường Tăng là Tôn Ngộ Không (Shay Banon), thần công quảng đại, có thể dời non lấp biển',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Ngộ Không không muốn sư phụ phải mệt nhọc thêm nữa trong việc tìm kiếm những bài giảng chân kinh trong bộ chân kinh đồ sộ kia',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Thiên hạ đồn rằng, trong giới giang hồ , bất kỳ cao thủ nào chỉ cần tu luyện bộ Elasticsearch thần công này thì đều có thể truy tìm được bất cứ ai ở bất kỳ đâu',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Do vậy các bậc cao thủ trong giang hồ nếu muốn truy tìm kẻ thù, hay điều tra phá án cho triều đình thì đều cần phải nắm vững bộ Search pháp này',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Search trong elasticsearch đó là Full text search, tìm kiếm trên toàn bộ văn bản',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Elasticsearch lưu trữ cả dữ liệu của mình chứ không đơn thuần chỉ là 1 search engine',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'nào là theo kiểu phân tán này, nào đọc song song này, mà nó thiết kế mục đích cho việc search nên là đọc nhanh lắm các bác à',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'À mà trong search pháp nay thì thuật ngữ index được coi là 1 database, 1 type được coi  là 1 bảng trong sql',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Việc đánh index trong elastic nó khác với bọn sql lắm. Bọn elastic này là nó dùng inverted index',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Bộ tâm pháp khẩu quyết của Elasticsearch dựa trên bộ Apache Lucene, hay nói cách khác thì động cơ bên trong của bộ máy elasticsearch là dựa trên Apache Lucene này',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Tìm kiếm dữ liệu rất nhanh chóng, mạnh mẽ dựa trên Apache Lucene',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Hỗ trợ tìm kiếm mờ (fuzzy), tức là từ khóa tìm kiếm có thể bị sai lỗi chính tả hay không đúng cú pháp thì vẫn có khả năng elasticsearch trả về kết quả tốt',
    },
    {
      author: 'Tôn Quang Từ',
      content: 'Elasticsearch được thiết kế cho mục đích search, do vậy với những nhiệm vụ khác ngoài search như CRUD thì elastic kém thế hơn so với những database khác như Mongodb, Mysql ',
    },

  ];

  return blogs;
}