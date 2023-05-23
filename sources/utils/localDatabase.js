import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

const tableName = 'FAVORITES';
const cartTableName = 'CARTS';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase(
        {
            name: 'superior-data.db', 
            location: 'default',
            createFromLocation: 3,
        },
        () => {},
        error => {
        console.log('ERROR: ' + error);
        },
    );
};



// --- CREATE TABLE HERE ----

export const createTable = async (db) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        PRODUCT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        PRODUCT_UUID VARCHAR(255) NOT NULL,
        PRODUCT_NAME TEXT NOT NULL,
        PRODUCT_PRICE INT(10) NOT NULL, 
        PRODUCT_SIDE_DISH VARCHAR(255), 
        PRODUCT_SIZE VARCHAR(255), 
        PRODUCT_IMAGE VARCHAR(255),
        IS_FAVORITE BOOL
    );`;
  
    await db.executeSql(query);
};

export const createCartTable = async (db) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${cartTableName}(
        PRODUCT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        PRODUCT_UUID VARCHAR(255) NOT NULL,
        PRODUCT_NAME TEXT NOT NULL,
        PRODUCT_PRICE INT(10) NOT NULL, 
        PRODUCT_SIDE_DISH VARCHAR(255), 
        PRODUCT_SIZE VARCHAR(255), 
        PRODUCT_IMAGE VARCHAR(255),
        NOTE VARCHAR(100),
        COUNT TINYINT NOT NULL
    );`;

    await db.executeSql(query);
}



// --- COLLECT/GET ITEMS HERE ---
  
export const collectFavoriteItems = async (db) => {
    try {
      const favoriteItems = [];
      const results = await db.executeSql(`SELECT rowid as PRODUCT_ID, PRODUCT_UUID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_SIDE_DISH, PRODUCT_SIZE, PRODUCT_IMAGE FROM ${tableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            favoriteItems.push(result.rows.item(index))
        }
      });
      return favoriteItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get favoriteItems !!!');
    }
};

export const collectCartItems = async (db) => {
    try {
      const favoriteItems = [];
      const results = await db.executeSql(`SELECT rowid as PRODUCT_ID, PRODUCT_UUID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_SIDE_DISH, PRODUCT_SIZE, PRODUCT_IMAGE, NOTE, COUNT FROM ${cartTableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            favoriteItems.push(result.rows.item(index))
        }
      });
      return favoriteItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get favoriteItems !!!');
    }
};



// --- INSERT/ADD NEW ITEMS HERE ---

export const insertFavoriteItems = async (db, PRODUCT_UUID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_SIDE_DISH, PRODUCT_SIZE, PRODUCT_IMAGE, IS_FAVORITE) => {
    const insertQuery =
      `INSERT INTO ${tableName}(PRODUCT_UUID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_SIDE_DISH, PRODUCT_SIZE, PRODUCT_IMAGE, IS_FAVORITE) values` +
      `('${PRODUCT_UUID}', '${PRODUCT_NAME}', ${PRODUCT_PRICE}, '${PRODUCT_SIDE_DISH}', '${PRODUCT_SIZE}', '${PRODUCT_IMAGE}', ${IS_FAVORITE})`
  
    return db.executeSql(insertQuery);
};

export const insertCartItems = async (db, PRODUCT_UUID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_SIDE_DISH, PRODUCT_SIZE, PRODUCT_IMAGE, NOTE, COUNT) => {
    const insertQuery =
      `INSERT INTO ${cartTableName}(PRODUCT_UUID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_SIDE_DISH, PRODUCT_SIZE, PRODUCT_IMAGE, NOTE, COUNT) values` +
      `('${PRODUCT_UUID}', '${PRODUCT_NAME}', ${PRODUCT_PRICE}, '${PRODUCT_SIDE_DISH}', '${PRODUCT_SIZE}', '${PRODUCT_IMAGE}', '${NOTE}', ${COUNT})`
  
    return db.executeSql(insertQuery);
};



// --- UPDATE/MODIFY ITEM HERE ---


  


// --- DELETE/REMOVE ITEM HERE ---

export const deleteItem = async (db, id) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

export const deleteCartItem = async (db, id) => {
    const deleteQuery = `DELETE from ${cartTableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};


// --- DELETE/DROP TABLE HERE ---

export const deleteTable = async (db) => {
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
};

export const deleteCartTable = async (db) => {
    const query = `drop table ${cartTableName}`;
    await db.executeSql(query);
};

//   db.transaction(function (txn) {
    //     txn.executeSql(
    //       "SELECT * FROM sqlite_master WHERE type='table' AND name='table_favorite'",
    //       [],
    //       function (tn, result) {
    //         console.log('item:', result.rows.length);
    //         if (result.rows.length == 0) {
    //           txn.executeSql('DROP TABLE IF EXISTS table_user', []);
    //           txn.executeSql(
    //             'CREATE TABLE IF NOT EXISTS table_favorite(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(50), product_price INT(10), product_side_dish VARCHAR(255), product_image VARCHAR(255))',
    //             []
    //           );
    //         }
    //       }
    //     );
    //   });