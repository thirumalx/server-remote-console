/**
 * 
 */
package io.github.thirumalx.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.thirumalx.dto.ServerDto;
import io.github.thirumalx.service.ServerService;

/**
 * @author ThirumalM
 */
@RequestMapping("/server")
@RestController
public class ServerContoller {
	
	private ServerService serverService;
	
	public ServerContoller(ServerService serverService) {
		super();
		this.serverService = serverService;
	}

	@PostMapping("")
	public ServerDto addServer(ServerDto serverDto) {
		return serverService.addServer(serverDto);
	}

}
