const categorias = (deps) => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT * FROM categorias 
                    WHERE urlCateg != "loterias" 
                    AND urlCateg != "jogos" 
                    AND urlCateg != "horoscopo" 
                    AND urlCateg != "agenda-cultural"
                    AND urlCateg != "utilidade-publica"
                    AND urlCateg != "politica"
                    AND urlCateg != "inspiracao"
                    AND urlCateg != "justica"
                    AND urlCateg != "governo"
                    AND urlCateg != "cidades"
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    save: (nome, url) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;
        try {
          sequelize
            .query(
              `
                    INSERT INTO categorias (nomeCateg, urlCateg) VALUES ('${nome}', '${url}')
                    `
            )
            .spread(function (results, metadata) {
              resolve({ categoria: { nome, url, id: results.insertId } });
            });
        } catch (err) {
          errorHandler(error, "Falha ao salvar.", reject);
          return false;
        }
      });
    },
    update: (id, nome, url) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;
        try {
          sequelize
            .query(
              `
                    UPDATE categorias SET nomeCateg = '${nome}', urlCateg = '${url}' WHERE id = ${id}
                    `
            )
            .spread(function (results, metadata) {
              resolve({
                categoria: { nome, url, id },
                affectedRows: results.affectedRows,
              });
            });
        } catch (err) {
          errorHandler(error, "Falha ao atualizar.", reject);
          return false;
        }
      });
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;
        try {
          sequelize
            .query(
              `
                    DELETE FROM categorias WHERE id = ${id}
                    `
            )
            .spread(function (results, metadata) {
              resolve({
                message: "Registro removido com sucesso!",
                affectedRows: results.affectedRows,
              });
            });
        } catch (err) {
          errorHandler(error, "Falha ao excluir.", reject);
          return false;
        }
      });
    },
  };
};

module.exports = categorias;
