import { Params } from "../types/Params";

const helpOptions = ["Quickstart", "API Docs", "Examples", "Github"];

// default provided welcome flow if user does not pass in a flow to the chat bot
export const defaultFlow = {
	start: {
		message: "Hello, I am Tan Jin 👋! Welcome to React ChatBotify, I'm excited that you are using our " +
			"chatbot 😊!",
		transition: {duration: 1000},
		path: "show_options"
	},
	show_options: {
		message: "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
			"things you can check out to get started:",
		options: helpOptions,
		path: "process_options"
	},
	prompt_again: {
		message: "Do you need any other help?",
		options: helpOptions,
		path: "process_options"
	},
	unknown_input: {
		message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
			"the Github option and open an issue there.",
		options: helpOptions,
		path: "process_options"
	},
	process_options: {
		transition: {duration: 0},
		path: (params: Params) => {
			let link = "";
			switch (params.userInput) {
			case "Quickstart":
				link = "https://react-chatbotify.tjtanjin.com/docs/introduction/quickstart/";
				break;
			case "API Docs":
				link = "https://react-chatbotify.tjtanjin.com/docs/api/bot_options";
				break;
			case "Examples":
				link = "https://react-chatbotify.tjtanjin.com/docs/examples/basic_form";
				break;
			case "Github":
				link = "https://github.com/tjtanjin/react-chatbotify/";
				break;
			default:
				return "unknown_input";
			}
			params.injectMessage("Sit tight! I'll send you right there!");
			setTimeout(() => {
				window.open(link);
			}, 1000)
			return "repeat"
		},
	},
	repeat: {
		transition: {duration: 3000},
		path: "prompt_again"
	},
}

// boolean indicating if user is on desktop (otherwise treated as on mobile)
export const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));