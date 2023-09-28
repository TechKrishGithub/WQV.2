import db from "../../WQDb";


export const createTable = (tableName, columns) => {
  const columnsString = columns.map(column => {
    if (column.constrain) {
      return `${column.name} ${column.type} ${column.constrain}`;
    } else {
      return `${column.name} ${column.type}`;
    }
  }).join(', ');

  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsString});`;

  db.transaction(tx => {
    tx.executeSql(
      query,
      [],
      () => console.log(`Table '${tableName}' created successfully.`),
      (txObj, error) => console.log(`Error creating table '${tableName}': ${error.message}`)
    );
  });
};

  // export const deleteFromTable = (tableName, condition, params) => {
  //   const query = `DELETE FROM ${tableName} WHERE ${condition};`;
  
  //   return new Promise((resolve, reject) => {
  //     db.transaction(
  //       tx => {
  //         tx.executeSql(
  //           query,
  //           params,
  //           (_, result) => {
  //             // Check the number of affected rows to determine success
  //             const rowsAffected = result.rowsAffected;
  //             console.log(rowsAffected,tableName)
  //             resolve(rowsAffected > 0); // Resolve true if rows were deleted, otherwise false
  //           },
  //           (txObj, error) => {
  //             console.log(`Error deleting rows from '${tableName}': ${error.message}`);
  //             reject(error);
  //           }
  //         );
  //       },
  //       (error) => {
  //         console.log(`Transaction error: ${error.message}`);
  //         reject(error);
  //       }
  //     );
  //   });
  // };
  
  export const deleteFromTable = (tableName, condition, params) => {
    const query = `DELETE FROM ${tableName} WHERE ${condition};`;
  
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            query,
            params,
            (_, result) => {
              const rowsAffected = result.rowsAffected;
              resolve(rowsAffected); // Resolve the number of affected rows
            },
            (txObj, error) => {
              console.log(`Error deleting rows from '${tableName}': ${error.message}`);
              reject(error);
            }
          );
        },
        (error) => {
          console.log(`Transaction error: ${error.message}`);
          reject(error);
        }
      );
    })
    .then(rowsAffected => {
      // Check if any rows were affected
      if (rowsAffected > 0) {
        return rowsAffected; // Return the number of affected rows
      } else {
        return -1; // Return -1 if no rows were affected
      }
    })
    .catch(error => {
      console.log(`Error: ${error.message}`);
      return -1; // Return -1 in case of an error
    });
  };
  

  
  export const InsertData = (tableName, data) => {
    const columnNames = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders});`;
  
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            query,
            values,
            (_, resultSet) => {
              console.log(`Data inserted into '${tableName}' successfully.`);
              resolve(resultSet);
            },
            (txObj, error) => {
              console.error(`Error inserting data into '${tableName}': ${error.message}`);
              reject(error);
            }
          );
        },
        (error) => {
          console.error(`Error executing transaction on '${tableName}':`, error);
          reject(error);
        }
      );
    });
  };
  


  export const selectData = (tableName) => {
    // Query to check if the table exists
    const checkTableQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`;
  
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          // Check if the table exists
          tx.executeSql(
            checkTableQuery,
            [],
            (_, resultSet) => {
              const results = resultSet.rows;
              if (results.length > 0) {
                // Table exists, execute the SELECT query
                const selectQuery = `SELECT * FROM ${tableName};`;
                tx.executeSql(
                  selectQuery,
                  [],
                  (_, resultSet) => {
                    const data = [];
                    const results = resultSet.rows;
                    for (let i = 0; i < results.length; i++) {
                      const item = results.item(i);
                      // Process the data here as needed.
                      data.push(item);
                    }
                    // console.log(`Selected data from '${tableName}':`, data);
                    resolve(data);
                  },
                  (_, error) => {
                    console.error(`Error executing SELECT query on '${tableName}':`, error);
                    reject(error);
                  }
                );
              } else {
                // Table does not exist
                resolve(false);
              }
            },
            (_, error) => {
              console.error(`Error checking table existence for '${tableName}':`, error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error(`Error executing transaction on '${tableName}':`, error);
          reject(error);
        }
      );
    });
  };
  
export const getColumnNames = (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `PRAGMA table_info(${tableName})`,
        [],
        (_, resultSet) => {
          const columns = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            columns.push(resultSet.rows.item(i).name);
          }
          resolve(columns);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
