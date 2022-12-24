import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';



test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu/>); 
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu/>);
    const baslik = screen.getByTestId("form-title");//data-testid ile tittle kontrol ettik
    expect(baslik).toBeInTheDocument();//expectten varmı kontrol ettik
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu/>);
    const isim = screen.getByTestId("isim-input");//isim inputunu bulduk
    fireEvent.change(isim,{target:{value:"hey"}});//isim input hey verdik
    expect(isim.value).toBe("hey");//isim input hey kontrolu

    const isimError = screen.getByTestId("isim-error"); 
    expect(isimError).toBeInTheDocument();//aktifmi kontrol ettik

});

test('kullanıcı inputları doldurmadığında gonderirse ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);
    let dizi=["isim-error","soyad-error","mail-error"];
    dizi.forEach(err => {
        expect(screen.getByTestId(err)).toBeInTheDocument();
    });
    
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    fireEvent.change(screen.getByTestId("isim-input"),{target:{value:"Aysegul"}});
    fireEvent.change(screen.getByTestId("soyad-input"),{target:{value:"Babacan"}});
    //fireEvent.change(screen.getByTestId("mail-input"),{target:{value:"asiBelaaxxxx"}});
    //fireEvent.change(screen.getByTestId("mail-input"),{target:{value:""}});
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByTestId("mail-error")).toBeInTheDocument();
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);
    fireEvent.change(screen.getByTestId("mail-input"),{target:{value:"abcdhetttt"}});
    expect(screen.getByText('Hata: email geçerli bir email adresi olmalıdır.')).toBeInTheDocument();//mesajı aradık
    
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);
    fireEvent.change(screen.getByTestId("isim-input"),{target:{value:"Aysegul"}});
    fireEvent.change(screen.getByTestId("mail-input"),{target:{value:"ababacan@gmail.com"}});
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText('Hata: soyad gereklidir.')).toBeInTheDocument();

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu/>);
    fireEvent.change(screen.getByTestId("isim-input"),{target:{value:"Aysegul"}});
    fireEvent.change(screen.getByTestId("soyad-input"),{target:{value:"Babacan"}});
    fireEvent.change(screen.getByTestId("mail-input"),{target:{value:"ababacan@gmail.com"}});
    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByTestId("mesaj-error")).not.toBeInTheDocument();
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const form = {
        ad: "Aysegul",
        soyad: "Babacan",
        email: "ababacan@gmail.com",
        mesaj: "a"
      };
      fireEvent.change(screen.getByTestId("isim-input"),{target:{value:form["ad"]}});
      fireEvent.change(screen.getByTestId("soyad-input"),{target:{value:form["soyad"]}});
      fireEvent.change(screen.getByTestId("mail-input"),{target:{value:form["email"]}});
      fireEvent.change(screen.getByTestId("mesaj-input"),{target:{value:form["mesaj"]}});
      fireEvent.click(screen.getByTestId("submit-button"));

      expect(screen.getByText(`Ad:${form["ad"]}`)).toBeInTheDocument();
      expect(screen.getByText(`Soyad:${form["soyad"]}`)).toBeInTheDocument();
      expect(screen.getByText(`Email:${form["email"]}`)).toBeInTheDocument();
      expect(screen.getByText(`Mesaj:${form["mesaj"]}`)).toBeInTheDocument();
});