/// <reference types="cypress" />

import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";

describe("login", () => {
  context("quando submeto o formulario", () => {
    it("deve logar com sucesso", () => {
      const user = {
        name: "Gerson",
        email: "gerson@testes.com",
        password: "testes123",
      };

      loginPage.submit(user.email, user.password);
      shaversPage.header.userShoudBeLoggedIn(user.name);
    });

    it("não deve logar com senha incorreta", () => {
      const user = {
        name: "Gerson",
        email: "gerson@testes.com",
        password: "123456",
      };

      loginPage.submit(user.email, user.password);

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";
      loginPage.noticeShouldBe(message);
    });
    it("não deve logar com email incorreto", () => {
      const user = {
        name: "Gerson",
        email: "gerson@gmail.com",
        password: "testes123",
      };

      loginPage.submit(user.email, user.password);

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";
      loginPage.noticeShouldBe(message);
    });

    it.only("campos obrigatórios", () => {
      loginPage.submit();
      loginPage.requiredFields("E-mail é obrigatório", "Senha é obrigatória");
    });
  });

  context("senha muito curta", () => {
    const passwords = ["1", "12", "123", "1234", "12345"];

    passwords.forEach((p) => {
      it(`não deve logar com a senha: ${p}`, () => {
        loginPage.submit("gerson@testes.com", p);
        loginPage.alertShouldBe("Pelo menos 6 caracteres");
      });
    });
  });

  context("email formato incorreto", () => {
    const emails = [
      "gerson&gmail.com",
      "gerson.com.br",
      "@gmail.com",
      "@",
      "gerson@",
      "1232212",
      "@#!@###@!",
      "xpto123",
    ];

    emails.forEach((e) => {
      it(`não deve logar com a senha: ${e}`, () => {
        loginPage.submit(e, "testes123");
        loginPage.alertShouldBe("Informe um email válido");
      });
    });
  });
});
