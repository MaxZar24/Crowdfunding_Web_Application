import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./AdditionalPagesStyles.css"

function AboutUs() {
    return (
        <div>
            <Header></Header>
            <div className="background">
                <div className="textField">
                    <h1>Про нас</h1>
                    <p>Добротвір — це українська краудфандингова платформа, створена з метою об'єднання людей для
                        підтримки
                        важливих соціальних, культурних та благодійних проектів. Ми віримо, що разом можемо робити добрі
                        справи та створювати зміни, що впливатимуть на наше суспільство на краще.</p>
                    <h2>Наша Місія</h2>
                    <p>Наша місія полягає в підтримці тих, хто потребує допомоги, а також у сприянні розвитку креативних
                        та
                        інноваційних ідей. Ми надаємо можливість кожному знайти підтримку для реалізації своїх проектів,
                        від
                        соціальних ініціатив до творчих стартапів.</p>
                    <h2>Що Ми Робимо</h2>
                    <ul style={{display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "0"}}>
                        <li><b>Підтримка благодійних ініціатив:</b>
                        </li>
                        <li style={{marginBottom: "10px"}}>Допомагаємо благодійним організаціям та окремим
                            особам
                            збирати кошти для вирішення нагальних соціальних проблем.
                        </li>
                        <li><b>Фінансування творчих проектів:</b></li>
                        <li style={{marginBottom: "10px"}}>Підтримуємо талановитих людей у втіленні їхніх творчих
                            задумів.
                        </li>
                        <li><b>Сприяння соціальним змінам:</b></li>
                        <li style={{marginBottom: "10px"}}>Збираємо кошти для проектів, що спрямовані на покращення
                            життя
                            громад.
                        </li>
                    </ul>
                    <h2>Зв'язок з Нами</h2>
                    <p style={{marginBottom: "5px"}}>Якщо у вас виникли питання або ви потребуєте допомоги, будь ласка,
                        зв'яжіться з нами. Ми завжди
                        раді допомогти!</p>
                    <p style={{marginBottom: "5px"}}>Email: <a className="contact-links"
                                                               href="mailto:support@dobrotvir.com">support@dobrotvir.com</a>
                    </p>
                    <p>Телефон: <a className="contact-links" href="tel:+380441234567">+38 (044) 123-45-67</a></p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AboutUs;