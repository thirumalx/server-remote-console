/**
 * 
 */
package io.github.thirumalx.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import io.github.thirumalx.dao.ServerDao;
import io.github.thirumalx.dto.ServerDto;

/**
 * @author ThirumalM
 */
@Service
public class ServerService {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	private ServerDao serverDao;

	public ServerService(ServerDao serverDao) {
		super();
		this.serverDao = serverDao;
	}

	public ServerDto addServer(ServerDto serverDto) {
		logger.debug("Adding server {}", serverDto);
		
		return null;
	}
}
