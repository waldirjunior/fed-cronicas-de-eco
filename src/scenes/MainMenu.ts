import { SaveUserUsecase } from './../domain/app/user/save-user.usecase';
import { GetUserUsecase } from './../domain/app/user/get-user.usecase';
import { Scene, GameObjects } from 'phaser';
import { STYLES } from '../shared/constants/style.constants';
import { app } from '../domain/app/app.module';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    // Novo
    usernameText: GameObjects.Text;
    passwordText: GameObjects.Text;
    loginButton: GameObjects.Text;
    createAccountButton: GameObjects.Text;
    createAccountForm: GameObjects.Container;
    nameCharacterText: GameObjects.Text;
    registerButton: GameObjects.Text;
    backButton: GameObjects.Text;

    target: string = '';
    currentText: string = '';

    username: string = '';
    password: string = '';
    nameCharacter: string = '';

    private readonly getUserUsecase: GetUserUsecase = app.GetUserUsecase;
    private readonly saveUserUsecase: SaveUserUsecase = app.SaveUserUsecase;

    constructor (

    )
    {
        super('MainMenu');
        console.log('MainMenu');
    }

    create ()
    {
        console.log('MainMenu create');
        this.background = this.add.image(462, 384, 'background');

        // 512, 300
        this.logo = this.add.image(512, 150, 'logo');
        this.logo.setDisplaySize(350, 350);
        this.logo.setAlpha(0.3);

        this.title = this.add.text(512, 330, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.createLoginForm();
        this.createCreateAccountForm();
    }

    createLoginForm() {
        // Create username input
        this.usernameText = this.add.text(400, 400, 'Username: ', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#000000', padding: { x: 10, y: 5 }
        }).setInteractive().on('pointerdown', () => { this.enterText('username'); });

        // Create password input
        this.passwordText = this.add.text(400, 450, 'Password: ', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#000000', padding: { x: 10, y: 5 }
        }).setInteractive().on('pointerdown', () => { this.enterText('password'); });

        // Create login button
        this.loginButton = this.add.text(512, 520, 'Login', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#0000ff', padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.handleLogin();
        });

        // Create account button
        this.createAccountButton = this.add.text(512, 620, 'Create Account', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.showCreateAccountForm();
        });
    }

    createCreateAccountForm() {
        // Create a container to hold the create account form elements
        this.createAccountForm = this.add.container(512, 384);
        this.createAccountForm.setVisible(false);

        // Create username input for create account
        this.createAccountForm.add(this.add.text(-112, -100, 'Username: ', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#000000', padding: { x: 10, y: 5 }
        }).setInteractive().on('pointerdown', () => { this.enterText('username'); }));

        // Create password input for create account
        this.createAccountForm.add(this.add.text(-112, -50, 'Password: ', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#000000', padding: { x: 10, y: 5 }
        }).setInteractive().on('pointerdown', () => { this.enterText('password'); }));

        // Create name character input for create account
        this.createAccountForm.add(this.add.text(-112, 0, 'Name Character: ', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#000000', padding: { x: 10, y: 5 }
        }).setInteractive().on('pointerdown', () => { this.enterText('nameCharacter'); }));

        // Create register button
        this.registerButton = this.add.text(0, 50, 'Register', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#00ff00', padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.handleRegister();
        });
        this.createAccountForm.add(this.registerButton);

        // Create back button
        this.backButton = this.add.text(0, 100, 'Back', {
            fontFamily: STYLES.fonts.family, fontSize: 24, color: '#ffffff',
            backgroundColor: '#ff0000', padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setInteractive().on('pointerdown', () => {
            this.hideCreateAccountForm();
        });
        this.createAccountForm.add(this.backButton);
    }

    enterText(targetParams: string) {
        let currentText = '';
        this.target = targetParams;

        if (this.target === 'username') currentText = this.username;
        if (this.target === 'password') currentText = this.password;
        if (this.target === 'nameCharacter') currentText = this.nameCharacter;

        if (!this.input.keyboard) {
            return;
        }

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Backspace') {
                currentText = currentText.slice(0, -1);
            } else if (event.key.length === 1) {
                currentText += event.key;
            }

            if (this.target === 'username') this.username = currentText;
            if (this.target === 'password') this.password = currentText;
            if (this.target === 'nameCharacter') this.nameCharacter = currentText;

            this.updateTextFields();
        });
    }

    updateTextFields() {
        this.usernameText.setText(`Username: ${this.username}`);
        this.passwordText.setText(`Password: ${'*'.repeat(this.password.length)}`); // mask the password with asterisks

        const usernameText = this.createAccountForm.getAt(0) as GameObjects.Text;
        const passwordText = this.createAccountForm.getAt(1) as GameObjects.Text;
        const nameCharacterText = this.createAccountForm.getAt(2) as GameObjects.Text;

        usernameText.setText(`Username: ${this.username}`);
        passwordText.setText(`Password: ${'*'.repeat(this.password.length)}`);
        nameCharacterText.setText(`Name Character: ${this.nameCharacter}`);
    }

    async handleLogin() {
        const valid = await this.getUserUsecase.validatePassword({
            username: this.username,
            password: this.password
        });
        if (valid) {
            this.scene.start('Game');

            this.scene.stop('MainMenu');
            this.scene.stop('Preloader');
        } else {
            alert('Invalid username or password');
        }
    }

    handleRegister() {
        if (this.username && this.password && this.nameCharacter) {
            this.saveUserUsecase.execute({
                username: this.username,
                password: this.password,
                nameCharacter: this.nameCharacter
            });
            alert('Account created successfully');
            this.hideCreateAccountForm();
        } else {
            alert('Please fill in all fields');
        }
    }

    showCreateAccountForm() {
        this.createAccountForm.setVisible(true);
        this.usernameText.setVisible(false);
        this.passwordText.setVisible(false);
        this.loginButton.setVisible(false);
        this.createAccountButton.setVisible(false);
    }

    hideCreateAccountForm() {
        this.createAccountForm.setVisible(false);
        this.usernameText.setVisible(true);
        this.passwordText.setVisible(true);
        this.loginButton.setVisible(true);
        this.createAccountButton.setVisible(true);
    }
}
