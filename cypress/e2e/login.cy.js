/// <reference types="cypress" />

import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";
import data from "../fixtures/user-login.json";

describe("login", () => {
  context("quando submeto o formulario", () => {
    it.only("deve logar com sucesso", () => {
      const user = data.sucess;

      cy.task("removeUser", user.email)
          .then(function(result) {
            cy.log(result);
          })

      cy.request({
        method: "POST",
        url: "http://localhost:3333/users",
        body: user,
      }).then(function (res) {
        expect(res.status).to.eq(201);
      });

      loginPage.submit(user.email, user.password);
      shaversPage.header.userShoudBeLoggedIn(user.name);
    });

    it("não deve logar com senha incorreta", () => {
      const user = data.invpass;
      loginPage.submit(user.email, user.password);
      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";
      loginPage.noticeShouldBe(message);
    });

    it("não deve logar com email incorreto", () => {
      const user = data.email404;
      loginPage.submit(user.email, user.password);
      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";
      loginPage.noticeShouldBe(message);
    });

    it("campos obrigatórios", () => {
      loginPage.submit();
      loginPage.requiredFields("E-mail é obrigatório", "Senha é obrigatória");
    });
  });

  context("senha muito curta", () => {
    data.shortpass.forEach((p) => {
      it(`não deve logar com a senha: ${p}`, () => {
        loginPage.submit("gerson@testes.com", p);
        loginPage.alertShouldBe("Pelo menos 6 caracteres");
      });
    });
  });

  context("email formato incorreto", () => {
    data.invemails.forEach((e) => {
      it(`não deve logar com a senha: ${e}`, () => {
        loginPage.submit(e, "testes123");
        loginPage.alertShouldBe("Informe um email válido");
      });
    });
  });
});
