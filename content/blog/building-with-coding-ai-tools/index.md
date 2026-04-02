---
title: "Building with Coding AI Tools"
date: "2025-03-23T00:00:00.000Z"
description: "*Because Why Not Let Robots Write Your Blog?* A technical deep-dive into integrating Perplexity AI’s language models, or, “How I taught my computer to argue wit"
---

*Because Why Not Let Robots Write Your Blog?*

A technical deep-dive into integrating Perplexity AI’s language models, or, “How I taught my computer to argue with itself.”

So, you want to make your Python app talk to Perplexity AI? Great! Because nothing says “cutting-edge” like outsourcing your brainpower to a server farm. In this article, I’ll dive into an example built with Amazon Q Developer, Perplexity and a few other tools. Maybe, just maybe, figure out if this is a good idea.

My effort; it’s a brautiful mess but works: [Modsecurity Rule Explainer](https://github.com/etiennemunnich/modsec-crs-rule-explainer).

## Project Overview

I started by trying to create a “flexible” language model interface. Translation: making it so you can swap out AI providers like you swap out socks or trying a new flavour of ice cream. There’s always a new flavour, or something like that. Except, instead of smelly feet, you get… well, potentially tastey AI responses.

## Key Components

### Penmenship lands better outcomes

Start with a plan, think of it as building psudeo code and request workflows ahead of time. This helps you understand the requirements. But the trick not only building great prompts, but knowing that these tools get it wrong (a lot).

Prompts MUST declare specific goals, steps, formats, constraints, etc. It’s a double edged sword to ask for best practises and error handling or test driven approaches as this often lands the models jumping down the prverbial rabbit hole and not delivering on the actual outcome you want.

### Base LLM Interface

In the code example I built, I started using fancy “abstract base classes” to make sure all the AI buddies behave. Think of it as putting them in a digital kindergarten:

```
from abc import ABC, abstractmethod
from typing import Dict, Any

class LLMProvider(ABC):
    """Base class for all LLM providers. Basically, the boss telling them what to do."""
    
    def __init__(self, api_key: str):
        self.api_key = api_key # The magic password to make them work.
    
    @abstractmethod
    def analyze(self, prompt: str) -> Dict[str, Any]:
        """Analyze text using the LLM provider. Or, "Think, robot, THINK!" """
        pass

```

### Perplexity Integration

Hooking up to Perplexity AI with all the grace of a toddler trying to plug in a USB:

```
from typing import Dict, Any
from .base import LLMProvider
import httpx

class PerplexityProvider(LLMProvider):
    """Implementation of LLMProvider for Perplexity AI. Or, "The robot that actually answers." """
    
    def __init__(self, api_key: str):
        super().__init__(api_key) # Super means "Do what your robot parents told you."
        self.client = httpx.Client(
            base_url="[https://api.perplexity.ai](https://api.perplexity.ai)", # Where the robot lives.
            headers={"Authorization": f"Bearer {api_key}"} # The robot's password.
        )
    
    def analyze(self, prompt: str) -> Dict[str, Any]:
        """Analyze text using Perplexity AI's API. Or, "Robot, tell me something interesting." """
        response = self.client.post("/chat/completions", json={
            "model": "pplx-7b-chat", # The robot's brain.
            "messages": [{"role": "user", "content": prompt}] # What we're asking the robot.
        })
        return response.json() # The robot's answer.

```

### Factory Pattern Implementation

Figuring out a “factory pattern”, to create robot instances. Because who wants to manually assemble robots?

```
class LLMFactory:
    """Factory class for creating LLM providers. Or, the robot assembly line."""
    _providers: Dict[str, Type[LLMProvider]] = {} # Where we keep the robot parts.

    @classmethod
    def create(cls, provider_name: str, api_key: str) -> LLMProvider:
        """Create an instance of the specified LLM provider. Or, "Build me a robot!" """
        if provider_name not in cls._providers:
            raise ValueError(f"Unknown provider: {provider_name}") # "Sorry, we don't have that model in stock."
        return cls._providers[provider_name](api_key) # Here's your robot!

    @classmethod
    def register_provider(cls, name: str, provider_class: Type[LLMProvider]):
        """Register a new provider class. Or, "Add a new robot to the assembly line." """
        cls._providers[name] = provider_class # Put the robot parts in the machine.

```

### Technical Implementation

Security considerations, built in patterns out the box. Whilst these code companions are constantly evolving, nearly all the tools I tested had a measure of common sense approaches to building secure code. For example, using environment variables, because hardcoding API keys is like leaving your front door unlocked with a sign that says “Please rob me.”
Usage Examples
```
def get_llm_client(api_key: str, provider: str = "perplexity"):
    """Initialize and return an LLM client instance. Or, "Get me a robot to talk to." """
    return LLMFactory.create(
        provider_name=provider,
        api_key=api_key # The robot's secret password.
    )

# Create an instance and analyze text. Or, "Ask the robot something profound."
llm = get_llm_client(api_key="your-api-key")
response = llm.analyze("Explain the meaning of life, and also, what's for dinner?") 
   # Multitasking robots.

```

### Testing and Quality Assurance

I really like testing everything TDD, because I wouldn’t trust a robot that hasn’t been thoroughly interrogated, would you? In one example, I built the desired example output JSON events and ask the code to build accordingly, code quality was pretty spot on.

## Conclusion

We’ve successfully built a system to talk to Perplexity AI. Now, if it leads to a robot uprising or just better blog posts, only time will tell.

Note: For detailed setup instructions and API documentation, please refer to the project’s README.md file. Or, ask a robot. They probably know.
